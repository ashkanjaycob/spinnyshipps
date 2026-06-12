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

/* ─── overlay & modal ─── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalPanel = styled.div`
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
  animation: ${popIn} 0.3s ease both;
`;

/* ─── bet display ─── */
const BetDisplay = styled.div`
  background: rgba(0,0,0,0.35);
  border: 1px solid rgba(255,180,50,0.3);
  border-radius: 12px;
  padding: 10px 16px;
  text-align: center;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #a07040;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s;
  &:hover { color: #fff; }
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

/* ─── preset chips ─── */
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

/* ─── advanced slider ─── */
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

  &:hover {
    background: linear-gradient(135deg, #ffb300, #ff5500);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(255,140,0,0.65);
  }
  &:active { transform: translateY(1px); }
`;

/* ─── presets ─── */
const PRESETS = [0.70, 1.75, 6.00, 12.50, 40.00];

interface BetPresetModalProps {
  wagerAmount: number;
  balance: number;
  minWager: number;
  maxWager: number;
  onSetWager: (amount: number) => void;
  onClose: () => void;
}

export const BetPresetPanel: React.FC<BetPresetModalProps> = ({
  wagerAmount,
  balance,
  minWager,
  maxWager,
  onSetWager,
  onClose,
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

  return (
    <Overlay onClick={onClose}>
      <ModalPanel onClick={(e) => e.stopPropagation()}>
        <BetDisplay>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
          <BetLabel>Bet Amount</BetLabel>
          <BetValue>{wagerAmount.toFixed(2)}</BetValue>
        </BetDisplay>

        <PresetGrid>
          {PRESETS.map((p) => (
            <PresetChip
              key={p}
              $active={wagerAmount === parseFloat(p.toFixed(2))}
              disabled={p > balance}
              onClick={() => handlePreset(p)}
            >
              {p.toFixed(2)}
            </PresetChip>
          ))}
          <PresetChip
            $active={showAdvanced}
            onClick={() => setShowAdvanced((v) => !v)}
          >
            Advanced
          </PresetChip>
        </PresetGrid>

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
              />
              <SliderLabel $bold>Max</SliderLabel>
            </SliderRow>
            <CurrentValue>{sliderVal.toFixed(2)}</CurrentValue>
          </AdvancedPanel>
        )}

        <ApplyBtn onClick={onClose}>
          Apply Bet
        </ApplyBtn>
      </ModalPanel>
    </Overlay>
  );
};

