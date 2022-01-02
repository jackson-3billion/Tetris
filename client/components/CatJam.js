import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const CatJam = ({ catJamBgmRef, isOpponent }) => {
  useEffect(() => {
    if (isOpponent) return;

    const catJamBgm = catJamBgmRef.current;
    catJamBgm.play();

    return () => {
      catJamBgm.pause();
    };
  }, [catJamBgmRef, isOpponent]);

  return createPortal(
    <Wrapper isOpponent={isOpponent}>
      <CatJamGif src="https://media2.giphy.com/media/JVglf7QjxaZZM2tjfB/giphy.gif" />
    </Wrapper>,
    document.getElementById(isOpponent ? 'opponent-cat-jam-portal' : 'cat-jam-portal'),
  );
};

export default CatJam;

const slideLeftToRight = keyframes`
    0% { transform: translate3d(calc(-100%), 0, 0); }
   40% { transform: translate3d(calc(-20%), 0, 0); }
  100% { transform: translate3d(calc(-100%), 0, 0); }
`;

const slideRightToLeft = keyframes`
    0% { transform: translate3d(calc(80%), 0, 0) rotateY(180deg); }
   40% { transform: translate3d(calc(20%), 0, 0) rotateY(180deg); }
  100% { transform: translate3d(calc(100%), 0, 0) rotateY(180deg); }
`;

const Wrapper = styled.div`
  animation: ${({ isOpponent }) => (!!isOpponent ? slideRightToLeft : slideLeftToRight)} 15s forwards;
`;

const CatJamGif = styled.img`
  height: 100%;
  width: 100%;
`;
