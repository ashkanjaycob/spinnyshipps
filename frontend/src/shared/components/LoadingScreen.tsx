import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const pulseRing = keyframes`
  0%   { transform: scale(0.8); opacity: 0.6; }
  50%  { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(0.8); opacity: 0.6; }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-10px); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at 60% 40%, #1a0533 0%, #0a0118 50%, #000 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  gap: 32px;
  animation: ${fadeIn} 0.5s ease both;
`;

const WheelRing = styled.div<{ $size: string; $color: string; $duration: string; $delay?: string }>`
  position: absolute;
  width: ${p => p.$size};
  height: ${p => p.$size};
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: ${p => p.$color};
  border-right-color: ${p => p.$color}55;
  animation: ${rotate} ${p => p.$duration} linear infinite;
  animation-delay: ${p => p.$delay ?? '0s'};
`;

const RingsWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${float} 3s ease-in-out infinite;
`;

const PulseCore = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffd700, #ff9500);
  box-shadow: 0 0 20px #ffd700, 0 0 40px #ff950088;
  animation: ${pulseRing} 1.8s ease-in-out infinite;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 900;
  letter-spacing: 6px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #ffd700, #ff9500, #ffd700, #fffacd);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 2.5s linear infinite;
  text-align: center;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #a78bfa;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  letter-spacing: 1px;
  opacity: 0.85;
`;

const Dot = styled.span<{ $i: number }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #a78bfa;
  display: inline-block;
  animation: ${pulseRing} 1.2s ease-in-out infinite;
  animation-delay: ${p => p.$i * 0.2}s;
`;

const ProgressBar = styled.div`
  width: clamp(200px, 50vw, 340px);
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: 40%;
  background: linear-gradient(90deg, #ffd700, #ff9500);
  border-radius: 4px;
  animation: ${shimmer} 1.5s linear infinite;
  background-size: 200% auto;
`;

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 12px;
  padding: 16px 24px;
  color: #fca5a5;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  text-align: center;
  max-width: 360px;
  line-height: 1.5;
`;

interface LoadingScreenProps {
  error?: string | null;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ error }) => {
  return (
    <Overlay>
      <RingsWrapper>
        <WheelRing $size="120px" $color="#ffd700" $duration="2s" />
        <WheelRing $size="90px"  $color="#a78bfa" $duration="1.5s" $delay="-0.5s" />
        <WheelRing $size="60px"  $color="#60a5fa" $duration="1s"   $delay="-0.2s" />
        <PulseCore />
      </RingsWrapper>

      <Title>SpinnyShipps</Title>

      {error ? (
        <ErrorBox>
          ⚠️ {error}
          <br />
          <small style={{ opacity: 0.7, marginTop: 6, display: 'block' }}>
            Make sure the backend is running
          </small>
        </ErrorBox>
      ) : (
        <>
          <StatusRow>
            <Dot $i={0} />
            <Dot $i={1} />
            <Dot $i={2} />
            Connecting to server…
          </StatusRow>
          <ProgressBar>
            <ProgressFill />
          </ProgressBar>
        </>
      )}
    </Overlay>
  );
};
