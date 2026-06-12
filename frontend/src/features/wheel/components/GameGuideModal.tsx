import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

/* ───────── animations ───────── */
const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const slideIn = keyframes`from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}`;
const scaleUp = keyframes`from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}`;

/* ───────── overlay ───────── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 16px;
  animation: ${fadeIn} 0.3s ease;
`;

const Modal = styled.div`
  background: linear-gradient(145deg, #0f172a 0%, #1e1040 50%, #0f172a 100%);
  border: 2px solid rgba(255,215,0,0.35);
  border-radius: 24px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.8), 0 0 60px rgba(167,139,250,0.15);
  overflow: hidden;
  animation: ${scaleUp} 0.35s cubic-bezier(0.34,1.56,0.64,1);
`;

/* ───────── header ───────── */
const Header = styled.div`
  background: linear-gradient(135deg, rgba(167,139,250,0.2), rgba(255,215,0,0.1));
  padding: 24px 28px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  text-align: center;
`;

const HeaderIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 8px;
`;

const HeaderTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 3px;
  text-transform: uppercase;
  background: linear-gradient(135deg, #ffd700, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const HeaderSub = styled.p`
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 6px 0 0;
  font-family: 'Inter', sans-serif;
`;

/* ───────── stepper ───────── */
const StepperRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 20px 28px 0;
`;

const StepDot = styled.button<{ $active: boolean; $done: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${p => p.$done ? '#4ade80' : p.$active ? '#ffd700' : 'rgba(255,255,255,0.2)'};
  background: ${p => p.$done ? 'rgba(74,222,128,0.2)' : p.$active ? 'rgba(255,215,0,0.2)' : 'transparent'};
  color: ${p => p.$done ? '#4ade80' : p.$active ? '#ffd700' : '#64748b'};
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-family: 'Inter', sans-serif;
  ${p => p.$active && css`box-shadow: 0 0 12px rgba(255,215,0,0.5);`}
`;

const StepLine = styled.div<{ $done: boolean }>`
  height: 2px;
  flex: 1;
  background: ${p => p.$done ? '#4ade80' : 'rgba(255,255,255,0.1)'};
  transition: background 0.4s ease;
  min-width: 20px;
`;

const StepLabel = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 6px 20px 0;
`;

const StepLabelText = styled.span<{ $active: boolean }>`
  font-size: 0.65rem;
  color: ${p => p.$active ? '#ffd700' : '#475569'};
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${p => p.$active ? 700 : 400};
  transition: color 0.3s;
  text-align: center;
  flex: 1;
`;

/* ───────── slide content ───────── */
const SlideWrapper = styled.div`
  padding: 24px 28px;
  min-height: 200px;
`;

const SlideContent = styled.div`
  animation: ${slideIn} 0.3s ease both;
`;

const SlideIcon = styled.div`
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 12px;
`;

const SlideTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffd700;
  text-align: center;
  margin: 0 0 16px;
  letter-spacing: 1px;
`;

const SlideList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SlideItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 12px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #cbd5e1;
  line-height: 1.5;
`;

const ItemIcon = styled.span`
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 1px;
`;

/* ───────── footer buttons ───────── */
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 28px 24px;
  border-top: 1px solid rgba(255,255,255,0.06);
  gap: 12px;
`;

const NavBtn = styled.button<{ $primary?: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.25s ease;
  letter-spacing: 1px;
  text-transform: uppercase;

  ${p => p.$primary ? css`
    background: linear-gradient(135deg, #ffd700, #b8860b);
    color: #0f172a;
    border: none;
    box-shadow: 0 4px 20px rgba(255,215,0,0.35);
    &:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,215,0,0.5); }
  ` : css`
    background: transparent;
    color: #64748b;
    border: 1px solid rgba(255,255,255,0.12);
    &:hover { color: #cbd5e1; border-color: rgba(255,255,255,0.25); }
  `}

  &:active { transform: translateY(1px); }
`;

const SkipBtn = styled.button`
  font-family: 'Inter', sans-serif;
  background: none;
  border: none;
  color: #475569;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
  &:hover { color: #94a3b8; }
`;

/* ───────── slide data ───────── */
const SLIDES = [
  {
    icon: '🎡',
    label: 'Gameplay',
    title: 'How to Play',
    items: [
      { icon: '🎯', text: 'Three nested wheels spin one after another — inner, middle, and outer.' },
      { icon: '✨', text: 'Land on a multiplier segment to collect your winnings instantly.' },
      { icon: '➡️', text: 'Land on "NEXT" to advance to the next (bigger) wheel for higher payouts!' },
      { icon: '🏆', text: 'The outer (big) wheel has the highest multipliers — go for the big win!' },
    ],
  },
  {
    icon: '💰',
    label: 'Bet Amount',
    title: 'Setting Your Bet',
    items: [
      { icon: '🎛️', text: 'Use the preset chips (0.70 · 1.75 · 6.00 · 12.50 · 40.00) to set your bet instantly.' },
      { icon: '🎚️', text: 'Use the slider to fine-tune any amount between Min and Max.' },
      { icon: '📊', text: 'Tap "Advanced" to open the slider panel for precise control.' },
      { icon: '✅', text: 'Press "Apply Bet" to confirm your wager before spinning.' },
    ],
  },
  {
    icon: '📜',
    label: 'Bet History',
    title: 'Viewing Bet History',
    items: [
      { icon: '📋', text: 'Tap the 📜 scroll icon (bottom right) to open your bet history.' },
      { icon: '🟢', text: 'Green border = win. Red border = loss.' },
      { icon: '💵', text: 'Each entry shows your wager amount, result, and timestamp.' },
      { icon: '🔄', text: 'History refreshes automatically after every spin.' },
    ],
  },
  {
    icon: '⚡',
    label: 'Tips',
    title: 'Pro Tips',
    items: [
      { icon: '🚀', text: 'Enable Turbo Mode in the bet panel for faster animations.' },
      { icon: '💡', text: 'Start with smaller bets to learn the wheel patterns.' },
      { icon: '🔊', text: 'Sound plays on every spin — use your device volume controls.' },
      { icon: '🌟', text: 'The centre star button also spins the wheel — try clicking it!' },
    ],
  },
];

interface GameGuideModalProps {
  onClose: () => void;
}

export const GameGuideModal: React.FC<GameGuideModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const isLast = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  return (
    <Overlay>
      <Modal>
        {/* Header */}
        <Header>
          <HeaderIcon>🗺️</HeaderIcon>
          <HeaderTitle>Game Guide</HeaderTitle>
          <HeaderSub>Learn everything in {SLIDES.length} quick steps</HeaderSub>
        </Header>

        {/* Stepper */}
        <StepperRow>
          {SLIDES.map((_, i) => (
            <React.Fragment key={i}>
              <StepDot
                $active={i === step}
                $done={i < step}
                onClick={() => setStep(i)}
              >
                {i < step ? '✓' : i + 1}
              </StepDot>
              {i < SLIDES.length - 1 && <StepLine $done={i < step} />}
            </React.Fragment>
          ))}
        </StepperRow>
        <StepLabel>
          {SLIDES.map((s, i) => (
            <StepLabelText key={i} $active={i === step}>{s.label}</StepLabelText>
          ))}
        </StepLabel>

        {/* Slide */}
        <SlideWrapper>
          <SlideContent key={step}>
            <SlideIcon>{slide.icon}</SlideIcon>
            <SlideTitle>{slide.title}</SlideTitle>
            <SlideList>
              {slide.items.map((item, i) => (
                <SlideItem key={i}>
                  <ItemIcon>{item.icon}</ItemIcon>
                  <span>{item.text}</span>
                </SlideItem>
              ))}
            </SlideList>
          </SlideContent>
        </SlideWrapper>

        {/* Footer */}
        <Footer>
          <SkipBtn onClick={onClose}>Skip guide</SkipBtn>
          <div style={{ display: 'flex', gap: 10 }}>
            {step > 0 && (
              <NavBtn onClick={() => setStep(s => s - 1)}>← Back</NavBtn>
            )}
            {isLast ? (
              <NavBtn $primary onClick={onClose}>Let's Play! 🎉</NavBtn>
            ) : (
              <NavBtn $primary onClick={() => setStep(s => s + 1)}>Next →</NavBtn>
            )}
          </div>
        </Footer>
      </Modal>
    </Overlay>
  );
};
