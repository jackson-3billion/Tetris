import React, { memo } from 'react';
import styled from '@emotion/styled';

const Display = ({ gameOver, text }) => {
  return <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>;
};

export default memo(Display); // re-rendering 방지

const StyledDisplay = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #333;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  color: ${({ gameOver }) => (gameOver ? 'red' : '#999')};
  background: #000;
  font-size: 0.8rem;
`;
