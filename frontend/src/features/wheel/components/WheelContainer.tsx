import React from 'react';
import { StyledWheelContainer, WheelGlow, WheelLayer, WheelPointer, CenterSpinButton } from './WheelStyles';
import ring1 from '../../../assets/wheels/wheel1.png';
import ring2 from '../../../assets/wheels/wheel2.png';
import ring3 from '../../../assets/wheels/wheel3.png';
import starImg from '../../../assets/star.png';
import { Orb } from '../../../shared/components/Orb';

interface WheelContainerProps {
  innerRotation: number;
  middleRotation: number;
  bigRotation: number;
  activeWheel: 'small' | 'middle' | 'big';
  transitionTime: number;
  onSpin?: () => void;
  isRoundActive?: boolean;
  balance?: number;
  wagerAmount?: number;
}

export const WheelContainer: React.FC<WheelContainerProps> = ({
  innerRotation,
  middleRotation,
  bigRotation,
  activeWheel,
  transitionTime,
  onSpin,
  isRoundActive = false,
  balance = 0,
  wagerAmount = 0,
}) => {
  const canSpin = !isRoundActive && balance >= wagerAmount;

  return (
    <StyledWheelContainer>
      <Orb 
        hue={45} 
        hoverIntensity={0.8} 
        rotateOnHover={true} 
        forceHoverState={isRoundActive} 
      />
      <WheelPointer $activeWheel={activeWheel} />
      <WheelGlow />
      {/* Outer Ring - Wheel 3 (Big) */}
      <WheelLayer
        src={ring3}
        alt="Outer Wheel"
        $size="100%"
        $zIndex={1}
        $rotation={bigRotation}
        $transitionTime={transitionTime}
        $isActive={!isRoundActive || activeWheel === 'big'}
      />
      {/* Middle Ring - Wheel 2 (Middle) */}
      <WheelLayer
        src={ring2}
        alt="Middle Wheel"
        $size="70%"
        $zIndex={2}
        $rotation={middleRotation}
        $transitionTime={transitionTime}
        $isActive={!isRoundActive || activeWheel === 'middle' || activeWheel === 'big'}
      />
      {/* Inner Ring - Wheel 1 (Little) */}
      <WheelLayer
        src={ring1}
        alt="Inner Wheel"
        $size="40%"
        $zIndex={3}
        $rotation={innerRotation}
        $transitionTime={transitionTime}
        $isActive={true} // Always active
      />
      {/* Center Spin Button (Star) */}
      <CenterSpinButton
        onClick={onSpin}
        disabled={!canSpin}
        $canSpin={canSpin}
        title="Spin the Wheel!"
      >
        <img src={starImg} alt="Spin" />
      </CenterSpinButton>
    </StyledWheelContainer>
  );
};
