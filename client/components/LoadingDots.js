import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const LoadingDots = () => {
  const [dots, setDots] = useState('...');

  useEffect(() => {
    const updateDots = () =>
      setDots((prevDots) => {
        if (prevDots.length === 5) {
          return '';
        }
        return prevDots + '.';
      });
    const timerId = setInterval(updateDots, 800);

    return () => clearInterval(timerId);
  }, []);

  return <LoadingIndicator>{dots}</LoadingIndicator>;
};

export default LoadingDots;

const LoadingIndicator = styled.span`
  color: white;
  font-size: 3vw;
`;
