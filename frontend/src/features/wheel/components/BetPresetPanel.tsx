import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

/* ─── animations ─── */
const popIn = keyframes`
  0%   { transform: scale(0.9); opacity: 0; }
  70%  { transform: scale(1.04); }
  100% { transform: scale(1);   opacity: 1; }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-12px); max-height: 0; }
  to   { opacity: 1; transform: translateY(0);     max-height: 200px; }
`;

/* ─── outer panel ─── */
const Panel = styled.div`
  width: 100%;
  max-width: 420px;
  background: linear-gradient(160deg, #3d1c00 0%, #2a1200 60%, #1a0a00 100%);
  border: 2px solid rgba(255,180,50,0.45);
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,200,80,0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${popIn} 0.4s ease both;
`;

/* ─── bet amount display ─── */
const BetDisplay = styled.div`
  background: rgba(0,0,0,0.35);
  border: 1px solid rgba(255,180,50,0.3);
  border-radius: 12px;
  padding: 10px 16px;
  text-align: center;
`;

const BetLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: #a07040;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 2px;
`;

const BetValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 8px rgba(255,180,50,0.4);
  line-height: 1;
`;

/* ─── preset chips grid ─── */
const PresetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const PresetChip = styled.button<{ $active: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: ${p => p.$active
    ? 'linear-gradient(135deg, #ff9f00, #e65c00)'
    : 'rgba(255,255,255,0.07)'};
  border: 1.5px solid ${p => p.$active
    ? 'rgba(255,200,80,0.9)'
    : 'rgba(255,255,255,0.18)'};
  border-radius: 12px;
  padding: 12px 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${p => p.$active
    ? '0 4px 18px rgba(255,150,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)'
    : 'inset 0 1px 0 rgba(255,255,255,0.05)'};
  text-shadow: ${p => p.$active ? '0 1px 4px rgba(0,0,0,0.4)' : 'none'};

  &:hover:not(:disabled) {
    background: ${p => p.$active
      ? 'linear-gradient(135deg, #ffb300, #f06000)'
      : 'rgba(255,255,255,0.14)'};
    border-color: rgba(255,200,80,0.7);
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 6px 20px rgba(255,150,0,0.35);
  }
  &:active:not(:disabled) { transform: scale(0.96); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

/* ─── advanced / slider section ─── */
const AdvancedPanel = styled.div`
  overflow: hidden;
  animation: ${slideDown} 0.3s ease both;
`;

const SliderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 0;
`;

const SliderLabel = styled.span<{ $bold?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #ffd700;
  font-weight: ${p => p.$bold ? 700 : 400};
  min-width: 38px;
  text-align: center;
  ${p => p.$bold && css`
    background: rgba(255,215,0,0.15);
    border: 1px solid rgba(255,215,0,0.35);
    border-radius: 20px;
    padding: 4px 10px;
  `}
`;

const Slider = styled.input`
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    #ff9f00 0%,
    #ff9f00 var(--pct, 0%),
    rgba(255,255,255,0.15) var(--pct, 0%),
    rgba(255,255,255,0.15) 100%
  );
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffdf80, #ff9f00);
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5), 0 0 12px rgba(255,160,0,0.6);
    cursor: grab;
    transition: transform 0.15s ease;
  }
  &::-webkit-slider-thumb:active { cursor: grabbing; transform: scale(1.2); }
  &::-moz-range-thumb {
    width: 22px; height: 22px; border-radius: 50%;
    background: radial-gradient(circle, #ffdf80, #ff9f00);
    border: 2px solid #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    cursor: grab;
  }
`;

const CurrentValue = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #fff;
  text-align: center;
  font-weight: 600;
  margin-top: 2px;
`;

/* ─── apply button ─── */
const ApplyBtn = styled.button`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #1a0800;
  background: linear-gradient(135deg, #ff9f00, #e65c00);
  border: none;
  border-radius: 14px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(255,140,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3);
  width: 100%;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #ffb300, #ff5500);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(255,140,0,0.65);
  }
  &:active:not(:disabled) { transform: translateY(1px); }
  &:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
`;

/* ─── turbo + balance row ─── */
const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const BalanceBadge = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #f5d070;
  background: rgba(255,215,0,0.1);
  border: 1px solid rgba(255,215,0,0.2);
  border-radius: 20px;
  padding: 6px 14px;
  font-weight: 600;
  white-space: nowrap;
`;

const TurboBtn = styled.button<{ $on: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  border: 1.5px solid ${p => p.$on ? 'rgba(255,200,80,0.8)' : 'rgba(255,255,255,0.15)'};
  background: ${p => p.$on
    ? 'linear-gradient(135deg, rgba(255,180,0,0.3), rgba(255,100,0,0.3))'
    : 'rgba(255,255,255,0.06)'};
  color: ${p => p.$on ? '#ffd700' : '#94a3b8'};
  &:hover { border-color: rgba(255,200,80,0.6); color: #ffd700; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

/* ─── Status text ─── */
const Status = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #f5d070;
  text-align: center;
  opacity: 0.85;
  min-height: 1rem;
  margin: 0;
  letter-spacing: 0.5px;
`;

/* ─── types ─── */
const PRESETS = [0.70, 1.75, 6.00, 12.50, 40.00];

interface BetPresetPanelProps {
  wagerAmount: number;
  balance: number;
  minWager: number;
  maxWager: number;
  isRoundActive: boolean;
  roundStatus: string;
  isTurbo: boolean;
  onSetWager: (amount: number) => void;
  onToggleTurbo: () => void;
  onSpin: () => void;
}

export const BetPresetPanel: React.FC<BetPresetPanelProps> = ({
  wagerAmount,
  balance,
  minWager,
  maxWager,
  isRoundActive,
  roundStatus,
  isTurbo,
  onSetWager,
  onToggleTurbo,
  onSpin,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sliderVal, setSliderVal] = useState(wagerAmount);

  const effectiveMax = Math.min(maxWager, balance);
  const pct = effectiveMax > minWager
    ? ((sliderVal - minWager) / (effectiveMax - minWager)) * 100
    : 0;

  const handlePreset = (val: number) => {
    const clamped = Math.min(val, effectiveMax);
    onSetWager(clamped);
    setSliderVal(clamped);
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setSliderVal(v);
  };

  const handleApplySlider = () => {
    onSetWager(sliderVal);
  };

  const canSpin = !isRoundActive && balance >= wagerAmount;

  return (
    <Panel>
      {/* Bet Display */}
      <BetDisplay>
        <BetLabel>Bet Amount</BetLabel>
        <BetValue>{wagerAmount.toFixed(2)}</BetValue>
      </BetDisplay>

      {/* Presets */}
      <PresetGrid>
        {PRESETS.map(p => (
          <PresetChip
            key={p}
            $active={wagerAmount === parseFloat(p.toFixed(2))}
            disabled={isRoundActive || p > balance}
            onClick={() => handlePreset(p)}
          >
            {p.toFixed(2)}
          </PresetChip>
        ))}
        <PresetChip
          $active={showAdvanced}
          disabled={isRoundActive}
          onClick={() => setShowAdvanced(v => !v)}
        >
          Advanced
        </PresetChip>
      </PresetGrid>

      {/* Advanced Slider */}
      {showAdvanced && (
        <AdvancedPanel>
          <SliderRow>
            <SliderLabel $bold>Min</SliderLabel>
            <Slider
              type="range"
              min={minWager}
              max={effectiveMax}
              step={0.05}
              value={sliderVal}
              style={{ '--pct': `${pct}%` } as React.CSSProperties}
              onChange={handleSlider}
              onMouseUp={handleApplySlider}
              onTouchEnd={handleApplySlider}
              disabled={isRoundActive}
            />
            <SliderLabel $bold>Max</SliderLabel>
          </SliderRow>
          <CurrentValue>{sliderVal.toFixed(2)}</CurrentValue>
        </AdvancedPanel>
      )}

      {/* Apply Bet */}
      <ApplyBtn onClick={onSpin} disabled={!canSpin}>
        {isRoundActive ? 'Spinning…' : 'Apply Bet'}
      </ApplyBtn>

      {/* Bottom Row */}
      <BottomRow>
        <BalanceBadge>💰 ${balance.toFixed(2)}</BalanceBadge>
        <TurboBtn $on={isTurbo} onClick={onToggleTurbo} disabled={isRoundActive}>
          {isTurbo ? '⚡ Turbo ON' : '🐢 Turbo OFF'}
        </TurboBtn>
      </BottomRow>

      <Status>{roundStatus}</Status>
    </Panel>
  );
};
