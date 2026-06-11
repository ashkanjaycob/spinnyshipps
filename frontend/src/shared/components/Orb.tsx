import React from 'react';
import styled, { keyframes } from 'styled-components';

interface OrbProps {
  hue?: number;
  hoverIntensity?: number;
  rotateOnHover?: boolean;
  forceHoverState?: boolean;
}

const pulse = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; filter: blur(40px) hue-rotate(0deg); }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; filter: blur(60px) hue-rotate(20deg); }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; filter: blur(40px) hue-rotate(0deg); }
`;

const intensePulse = keyframes`
  0% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.9; filter: blur(50px) hue-rotate(0deg); }
  25% { transform: translate(-50%, -50%) scale(1.15) rotate(5deg); opacity: 1; filter: blur(70px) hue-rotate(30deg); }
  50% { transform: translate(-50%, -50%) scale(1.05) rotate(-5deg); opacity: 0.8; filter: blur(60px) hue-rotate(60deg); }
  75% { transform: translate(-50%, -50%) scale(1.15) rotate(5deg); opacity: 1; filter: blur(80px) hue-rotate(30deg); }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.9; filter: blur(50px) hue-rotate(0deg); }
`;

const OrbContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
`;

const OrbElement = styled.div<{ $hue: number; $isHovered: boolean; $hoverIntensity: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, hsl(${props => props.$hue}, 100%, 60%), hsl(${props => props.$hue + 40}, 100%, 40%) 40%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: all 0.5s ease-in-out;
  animation: ${props => props.$isHovered ? intensePulse : pulse} ${props => props.$isHovered ? '0.5s' : '4s'} infinite ease-in-out;
  mix-blend-mode: screen;
`;

export const Orb: React.FC<OrbProps> = ({ 
  hue = 45, // Default gold hue
  hoverIntensity = 0.5, 
  forceHoverState = false 
}) => {
  return (
    <OrbContainer>
      <OrbElement 
        $hue={hue} 
        $isHovered={forceHoverState} 
        $hoverIntensity={hoverIntensity} 
      />
    </OrbContainer>
  );
};
