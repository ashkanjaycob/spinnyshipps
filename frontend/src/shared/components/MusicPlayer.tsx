import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import bgmUrl from '../../assets/bgm.mp3';

const PlayerButton = styled.button<{ $isPlaying: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.$isPlaying ? 'linear-gradient(135deg, #1e3a8a, #0f172a)' : 'rgba(15, 23, 42, 0.6)'};
  border: 2px solid ${props => props.$isPlaying ? '#ffd700' : 'rgba(255, 255, 255, 0.3)'};
  color: ${props => props.$isPlaying ? '#ffd700' : '#ffffff'};
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

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(bgmUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <PlayerButton onClick={togglePlay} $isPlaying={isPlaying} title="Toggle Music">
      {isPlaying ? '🔊' : '🔇'}
    </PlayerButton>
  );
};
