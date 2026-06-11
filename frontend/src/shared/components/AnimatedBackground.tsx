import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import parkBg from '../../assets/shipBg.jpg';

const sway = keyframes`
  0% { transform: scale(1.05) rotate(0deg); filter: contrast(1); }
  25% { transform: scale(1.08) rotate(0.5deg); filter: contrast(1.1); }
  50% { transform: scale(1.05) rotate(0deg); filter: contrast(1); }
  75% { transform: scale(1.08) rotate(-0.5deg); filter: contrast(1.05); }
  100% { transform: scale(1.05) rotate(0deg); filter: contrast(1); }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -10;
  overflow: hidden;
  background-color: #0f172a;
`;

const ParallaxWrapper = styled.div.attrs<{ $mouseX: number, $mouseY: number }>(props => ({
  style: {
    transform: `translate(${props.$mouseX * -30}px, ${props.$mouseY * -30}px)`,
  },
}))<{ $mouseX: number, $mouseY: number }>`
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${parkBg});
  background-size: cover;
  background-position: center;
  animation: ${sway} 20s ease-in-out infinite;
`;

const FloatingDust = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: particleMove 30s linear infinite;
  opacity: 0.3;

  @keyframes particleMove {
    from { background-position: 0 0; }
    to { background-position: 500px 500px; }
  }
`;

export const AnimatedBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) - 0.5;
          const y = (e.clientY / window.innerHeight) - 0.5;
          setMousePos({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <BackgroundContainer>
      <ParallaxWrapper $mouseX={mousePos.x} $mouseY={mousePos.y}>
        <BackgroundImage />
        <FloatingDust />
      </ParallaxWrapper>
    </BackgroundContainer>
  );
};
