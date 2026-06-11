import styled from 'styled-components';

export const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100dvh;
  width: 100%;
  padding: clamp(10px, 3vw, 20px);
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 4px;
  background: linear-gradient(135deg, #ffffff 0%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
`;

export const WheelContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: clamp(280px, 55vh, 480px);
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  
  @media (max-width: 768px) {
    max-width: clamp(250px, 50vh, 90vw);
  }
`;

export const WheelGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110%;
  height: 110%;
  background: radial-gradient(
    circle,
    rgba(165, 180, 252, 0.15) 0%,
    rgba(99, 102, 241, 0.08) 50%,
    transparent 70%
  );
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
`;

export const WheelPointer = styled.div<{ $activeWheel: 'small' | 'middle' | 'big' }>`
  position: absolute;
  left: 50%;
  z-index: 10;
  width: clamp(28px, 9vw, 46px);
  height: clamp(34px, 11vw, 56px);
  background: linear-gradient(to bottom, #fff5e6, #ffd700 40%, #b8860b);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  transform: translate(-50%, -100%);
  transition: top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  top: ${props => {
    if (props.$activeWheel === 'small') return '30%';
    if (props.$activeWheel === 'middle') return '15%';
    return '0%';
  }};
  filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 12px rgba(255, 215, 0, 0.8));
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 4px;
    right: 4px;
    bottom: 8px;
    background: linear-gradient(to bottom, #ffe4b5, #daa520);
    clip-path: polygon(50% 100%, 0 0, 100% 0);
  }
`;

interface WheelLayerProps {
  $size: string;
  $zIndex: number;
  $rotation: number;
  $transitionTime: number;
}

export const WheelLayer = styled.img<WheelLayerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.$size};
  height: ${props => props.$size};
  z-index: ${props => props.$zIndex};
  transform: translate(-50%, -50%) rotate(${props => props.$rotation}deg);
  transition: transform ${props => props.$transitionTime}s cubic-bezier(0.2, 0.8, 0.2, 1);
  filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.7))
          drop-shadow(0 5px 15px rgba(0, 0, 0, 0.6));
  pointer-events: none;
  user-select: none;
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  z-index: 2;
`;

export const SpinButton = styled.button`
  background: linear-gradient(135deg, #1e3a8a, #0f172a);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 215, 0, 0.6);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
              0 0 15px rgba(255, 215, 0, 0.3);
  color: #ffd700;
  font-size: clamp(1.1rem, 4vw, 1.3rem);
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: clamp(12px, 3vh, 18px) clamp(30px, 8vw, 50px);
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 215, 0, 0.3),
      transparent
    );
    transition: 0.6s;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #254499, #152238);
    border-color: rgba(255, 215, 0, 1);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 40px 0 rgba(0, 0, 0, 0.7),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                0 0 25px rgba(255, 215, 0, 0.5);
    
    &::before {
      left: 100%;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(1px) scale(0.98);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    background: rgba(15, 23, 42, 0.8);
    color: #64748b;
    border-color: #334155;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    &::before {
      display: none;
    }
  }
`;

export const StatusText = styled.p`
  font-size: 1rem;
  color: #ffd700;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  opacity: 0.9;
  height: 1.2rem;
  margin-top: 5px;
`;

export const GamePanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 3vw, 20px);
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 58, 138, 0.7));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.4);
  padding: clamp(10px, 2vh, 15px) clamp(15px, 5vw, 25px);
  border-radius: 20px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(255, 215, 0, 0.1);
  width: 100%;
  max-width: 600px;

  .stat {
    font-weight: 600;
    span {
      color: #ffd700;
    }
  }

  .bet-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;

    .bet-amount {
      color: #ffd700;
      min-width: 60px;
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    max-width: 320px;
    padding: 10px 15px;
  }
`;

export const ActionButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? 'linear-gradient(135deg, #ffd700, #b8860b)' : 'rgba(30, 58, 138, 0.5)'};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid ${props => props.$active ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 215, 0, 0.3)'};
  color: ${props => props.$active ? '#0f172a' : '#ffffff'};
  font-size: 0.9rem;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$active ? '0 4px 15px rgba(255, 215, 0, 0.4)' : '0 4px 15px rgba(0, 0, 0, 0.4)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;

  &:hover:not(:disabled) {
    background: ${props => props.$active ? 'linear-gradient(135deg, #ffea00, #daa520)' : 'rgba(30, 58, 138, 0.8)'};
    border-color: rgba(255, 215, 0, 0.8);
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${props => props.$active ? '0 6px 20px rgba(255, 215, 0, 0.6)' : '0 6px 20px rgba(0, 0, 0, 0.6)'};
  }

  &:active:not(:disabled) {
    transform: translateY(1px) scale(0.98);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(100%);
  }
`;

export const IconButton = styled(ActionButton)`
  padding: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
`;
