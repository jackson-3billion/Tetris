import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const LoadingDots = ({ size }) => {
  const [num, setNum] = useState(2);

  useEffect(() => {
    const updateDots = () => setNum((prevNum) => (prevNum + 1) % 6);
    const timerId = setInterval(updateDots, 800);

    return () => clearInterval(timerId);
  }, []);

  return (
    <Dots>
      {Array.from({ length: 5 }, (_, idx) => (
        <Dot key={idx} visible={idx < num}>
          .
        </Dot>
      ))}
    </Dots>
  );
};

export default LoadingDots;

const Dots = styled.span`
  color: white;
  font-size: ${({ size }) => (size ? size : '3vw')};
`;

const Dot = styled.span`
  color: ${({ visible }) => (visible ? 'white' : 'transparent')};
`;
