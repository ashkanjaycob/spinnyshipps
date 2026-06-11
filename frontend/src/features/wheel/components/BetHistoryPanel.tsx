import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePlayerStore } from '../../../core/store/playerStore';
import { wheelSocket } from '../../../core/network/socket';

const HistoryButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 80px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.$isOpen ? 'linear-gradient(135deg, #1e3a8a, #0f172a)' : 'rgba(15, 23, 42, 0.6)'};
  border: 2px solid ${props => props.$isOpen ? '#ffd700' : 'rgba(255, 255, 255, 0.3)'};
  color: ${props => props.$isOpen ? '#ffd700' : '#ffffff'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  }
`;

const PanelContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  max-height: 400px;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 58, 138, 0.9));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.4);
  border-radius: 12px;
  padding: 15px;
  color: white;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);

  animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 215, 0, 0.4);
    border-radius: 3px;
  }
`;

const Title = styled.h3`
  font-size: 1.1rem;
  color: #ffd700;
  margin-bottom: 15px;
  text-transform: uppercase;
  text-align: center;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  padding-bottom: 10px;
`;

const HistoryItem = styled.div<{ $isWin: boolean }>`
  background: rgba(0, 0, 0, 0.3);
  border-left: 3px solid ${props => props.$isWin ? '#4ade80' : '#ef4444'};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  font-size: 0.85rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PayoutInfo = styled.div<{ $isWin: boolean }>`
  font-weight: bold;
  color: ${props => props.$isWin ? '#4ade80' : '#ef4444'};
`;

const EmptyState = styled.div`
  text-align: center;
  color: #a1a1aa;
  padding: 20px 0;
  font-size: 0.9rem;
`;

export const BetHistoryPanel: React.FC = () => {
  const { betHistory, setBetHistory } = usePlayerStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleHistory = (history: any[]) => {
      setBetHistory(history);
    };

    wheelSocket.onHistory(handleHistory);
    wheelSocket.fetchHistory();

    return () => {
      wheelSocket.offHistory(handleHistory);
    };
  }, [setBetHistory]);

  return (
    <>
      <HistoryButton 
        onClick={() => setIsOpen(!isOpen)} 
        $isOpen={isOpen}
        title="Bet History"
      >
        📜
      </HistoryButton>

      {isOpen && (
        <PanelContainer>
          <Title>Bet History</Title>
          {betHistory.length === 0 ? (
            <EmptyState>No bets placed yet.</EmptyState>
          ) : (
            betHistory.map((bet: any) => {
              const isWin = parseFloat(bet.winAmount) > 0;
              return (
                <HistoryItem key={bet.id} $isWin={isWin}>
                  <BetInfo>
                    <span>Wager: ${parseFloat(bet.betAmount).toFixed(2)}</span>
                    <span style={{ color: '#a1a1aa', fontSize: '0.75rem' }}>
                      {new Date(bet.timestamp).toLocaleString()}
                    </span>
                  </BetInfo>
                  <PayoutInfo $isWin={isWin}>
                    {isWin ? `+$${parseFloat(bet.winAmount).toFixed(2)}` : `-$${parseFloat(bet.betAmount).toFixed(2)}`}
                  </PayoutInfo>
                </HistoryItem>
              );
            })
          )}
        </PanelContainer>
      )}
    </>
  );
};
