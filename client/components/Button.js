import React, { memo } from 'react';
import styled from '@emotion/styled';
import { darken } from 'polished';

const Button = ({ children, callback, disabled, ...props }) => {
  return (
    <StyledButton onClick={callback} disabled={disabled} {...props}>
      {children}
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
  color: ${({ color }) => (color ? color : 'white')};
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '#333')};
  font-size: 1rem;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:disabled {
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${({ backgroundColor }) => darken(0.2, backgroundColor || '#333')};
  }

  @media all and(min-width: 801px) and (max-width: 1000px) {
    font-size: 1.6rem;
  }

  @media all and (min-width: 601px) and (max-width: 800px) {
    font-size: 1.4rem;
  }

  @media all and (max-width: 600px) {
    font-size: 1.2rem;
  }
`;
