import React, { useEffect } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #1e3a8a, #0f172a);
  border: 4px solid #ffd700;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.3);
  color: white;
  animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  max-width: 90%;

  @keyframes scaleUp {
    from { transform: scale(0.5); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  color: #ffd700;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const Amount = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: #4ade80;
  margin-bottom: 30px;
  text-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
`;

const CloseButton = styled.button`
  background: linear-gradient(135deg, #ffd700, #b8860b);
  color: #0f172a;
  border: none;
  padding: 15px 40px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

interface WinModalProps {
  amount: number;
  onClose: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({ amount, onClose }) => {
  // Auto-close after 5 seconds if not dismissed
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ModalOverlay onClick={onClose}>
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Epic Win!</Title>
        <Amount>+${amount.toFixed(2)}</Amount>
        <CloseButton onClick={onClose}>Collect</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};
