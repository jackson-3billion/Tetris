import React, { memo } from 'react';
import styled from '@emotion/styled';

const Button = ({ text, callback, color }) => {
  return (
    <StyledButton onClick={callback} color={color}>
      {text}
    </StyledButton>
  );
};

export default memo(Button);

const StyledButton = styled.button`
  margin: 0 0 20px 0;
  padding: 20px;
  min-height: 30px;
  width: 100%;
  border-radius: 20px;
  border: none;
  color: white;
  background: ${({ color }) => color || '#333'};
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;
