import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100svw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.95), rgba(15, 23, 42, 0.95));
  border: 2px solid #ffd700;
  border-radius: 16px;
  padding: 30px;
  max-width: 450px;
  width: 90%;
  color: #fff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(255, 215, 0, 0.2);
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

const ModalTitle = styled.h2`
  color: #ffd700;
  font-size: 1.8rem;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
`;

const ModalText = styled.p`
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #e2e8f0;
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, #ffd700, #b8860b);
  color: #0f172a;
  border: none;
  padding: 12px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 215, 0, 0.6);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Welcome Aboard!</ModalTitle>
        <ModalText>
          Spin the captain's wheel to win treasures. <br /><br />
          <strong>Rules:</strong><br />
          - Set your wager.<br />
          - Spin the wheel.<br />
          - Multiply your gold!<br />
        </ModalText>
        <StartButton onClick={() => setIsOpen(false)}>Set Sail</StartButton>
      </ModalContent>
    </ModalOverlay>
  );
};
