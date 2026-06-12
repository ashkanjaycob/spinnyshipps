import React, { useState, useRef } from 'react';
import { WheelContainer } from './components/WheelContainer';
import { FeatureContainer, Title } from './components/WheelStyles';
import { WinModal } from './components/WinModal';
import { BetHistoryPanel } from './components/BetHistoryPanel';
import { BetPresetPanel } from './components/BetPresetPanel';
import { BetPanel } from './components/BetPanel';
import { GameGuideModal } from './components/GameGuideModal';
import { getPlayerProfile } from '../../core/network/api';
import { usePlayerStore } from '../../core/store/playerStore';
import { wheelSocket } from '../../core/network/socket';
import { useSpinSound } from '../../shared/components/useSpinSound';
import type { SpinPathStep, SpinResult, WheelTier } from './types';

const TIER_LABEL: Record<WheelTier, string> = {
  small: 'Tier 1',
  middle: 'Tier 2',
  big: 'Tier 3',
};

function nextRotation(current: number, targetDeg: number, extraTurns = 5): number {
  const baseRotation = 360 * extraTurns;
  return current + baseRotation + (360 - targetDeg) - (current % 360);
}

export const WheelFeature: React.FC = () => {
  const {
    balance,
    wagerAmount,
    minWager,
    maxWager,
    isRoundActive,
    isReady,
    setWager,
    startRound,
    resolveRound,
    failRound,
    setBalance,
  } = usePlayerStore();

  const [innerRotation, setInnerRotation] = useState<number>(0);
  const [middleRotation, setMiddleRotation] = useState<number>(0);
  const [bigRotation, setBigRotation] = useState<number>(0);
  const [activeWheel, setActiveWheel] = useState<WheelTier>('small');
  const [roundStatus, setRoundStatus] = useState<string>('Ready to spin');
  const [isTurbo, setIsTurbo] = useState<boolean>(false);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const [showGuide, setShowGuide] = useState<boolean>(true);

  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);

  const { playWhoosh, playTick, playWin } = useSpinSound();

  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAnimationTimeouts = () => {
    animationTimeoutsRef.current.forEach(clearTimeout);
    animationTimeoutsRef.current = [];
  };

  const scheduleTimeout = (callback: () => void, delay: number) => {
    const timeout = setTimeout(callback, delay);
    animationTimeoutsRef.current.push(timeout);
  };

  const spinWheel = (step: SpinPathStep) => {
    if (step.wheel === 'small') {
      setInnerRotation((current) => nextRotation(current, step.targetDeg));
      return;
    }
    if (step.wheel === 'middle') {
      setMiddleRotation((current) => nextRotation(current, step.targetDeg));
      return;
    }
    setBigRotation((current) => nextRotation(current, step.targetDeg));
  };

  const animateSpinPath = (result: SpinResult, isTurboMode: boolean): number => {
    const spinDuration = isTurboMode ? 1500 : 5000;
    const thrustDelay = isTurboMode ? 200 : 600;
    let elapsed = 0;

    for (let index = 0; index < result.path.length; index += 1) {
      const step = result.path[index];
      const nextStep = result.path[index + 1];

      scheduleTimeout(() => {
        setActiveWheel(step.wheel);
        setRoundStatus(`Spinning ${TIER_LABEL[step.wheel]}…`);
        spinWheel(step);
        playWhoosh();
      }, elapsed);

      elapsed += spinDuration;

      scheduleTimeout(() => {
        playTick();
      }, elapsed - 200);

      if (step.type === 'next_wheel' && nextStep) {
        scheduleTimeout(() => {
          setActiveWheel(nextStep.wheel);
          setRoundStatus('Next wheel!');
        }, elapsed);
        elapsed += thrustDelay;
      }
    }

    return elapsed;
  };

  const formatResultStatus = (result: SpinResult): string => {
    const pathSummary = result.path.map((step) => step.label).join(' → ');
    if (result.payoutAmount <= 0) {
      return `${pathSummary} — lost $${result.wagerAmount.toFixed(2)} (balance $${result.balance.toFixed(2)})`;
    }
    return `${pathSummary} — won $${result.payoutAmount.toFixed(2)} (balance $${result.balance.toFixed(2)})`;
  };

  const handleSpin = async () => {
    if (!isReady || isRoundActive || balance < wagerAmount) return;

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    clearAnimationTimeouts();
    setWinAmount(null);

    startRound();
    setRoundStatus('Spinning...');
    setActiveWheel('small');

    try {
      const result = await wheelSocket.placeWager(wagerAmount);
      const totalAnimationMs = animateSpinPath(result, isTurbo);

      scheduleTimeout(() => {
        resolveRound(result);
        setRoundStatus(formatResultStatus(result));

        if (result.payoutAmount > 0) {
          setWinAmount(result.payoutAmount);
          playWin();
        }

        wheelSocket.fetchHistory();

        resetTimeoutRef.current = setTimeout(() => {
          setActiveWheel('small');
          setRoundStatus('Ready to spin');
        }, 3000);
      }, totalAnimationMs);
    } catch (error) {
      failRound();
      setActiveWheel('small');
      const message = error instanceof Error ? error.message : 'Round failed';
      setRoundStatus(message);

      try {
        const profile = await getPlayerProfile();
        setBalance(parseFloat(profile.wallet.balance), profile.wallet.currency);
      } catch {
        // Profile refresh failed — balance will sync on next load
      }
    }
  };

  return (
    <FeatureContainer>
      <Title>spinny ships</Title>

      <WheelContainer
        innerRotation={innerRotation}
        middleRotation={middleRotation}
        bigRotation={bigRotation}
        activeWheel={activeWheel}
        transitionTime={isTurbo ? 1.5 : 5}
        onSpin={handleSpin}
        isRoundActive={isRoundActive}
        balance={balance}
        wagerAmount={wagerAmount}
      />

      <BetPanel
        wagerAmount={wagerAmount}
        balance={balance}
        minWager={minWager}
        maxWager={maxWager}
        isRoundActive={isRoundActive}
        roundStatus={roundStatus}
        isTurbo={isTurbo}
        onSetWager={setWager}
        onToggleTurbo={() => setIsTurbo(!isTurbo)}
        onSpin={handleSpin}
        onOpenPresets={() => setIsPresetsOpen(true)}
      />

      {isPresetsOpen && (
        <BetPresetPanel
          wagerAmount={wagerAmount}
          balance={balance}
          minWager={minWager}
          maxWager={maxWager}
          onSetWager={setWager}
          onClose={() => setIsPresetsOpen(false)}
        />
      )}

      <BetHistoryPanel />

      {winAmount !== null && (
        <WinModal amount={winAmount} onClose={() => setWinAmount(null)} />
      )}

      {showGuide && (
        <GameGuideModal onClose={() => setShowGuide(false)} />
      )}
    </FeatureContainer>
  );
};
