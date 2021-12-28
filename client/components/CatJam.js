import React from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const CatJam = () => {
  return createPortal(
    <CatJamGif src="https://media2.giphy.com/media/JVglf7QjxaZZM2tjfB/giphy.gif" />,
    document.getElementById('cat-jam-portal'),
  );
};

export default CatJam;

const slideInAndOut = keyframes`
    0% { transform: translateX(calc(-100%)); }
   50% { transform: translateX(0)}
  100% { transform: translateX(calc(-100%)); };
`;

const CatJamGif = styled.img`
  height: 100%;
  animation: ${slideInAndOut} 8s forwards;
`;
