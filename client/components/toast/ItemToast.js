import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { iconMapper } from '@utils/items';

const ItemToast = ({ name, isSending }) => {
  return (
    <Wrapper isSending={isSending}>
      <ToastBox isSending={isSending}>
        <ToastIcon>{iconMapper[name]}</ToastIcon>
      </ToastBox>
    </Wrapper>
  );
};

export default ItemToast;

const moveRight = keyframes`
  100% { transform: translateX(calc(100%)); };
`;

const moveLeft = keyframes`
  100% { transform: translateX(calc(-100%)); };
`;

const moveUpAndDown = keyframes`
   50% { transform: translateY(calc(-200%)); }
  100% { transform: translateY(0); };
`;

const moveDownAndUp = keyframes`
   50% { transform: translateY(calc(200%)); }
  100% { transform: translateY(0); };
`;

const Wrapper = styled.div`
  position: absolute;
  animation: ${({ isSending }) => (isSending ? moveUpAndDown : moveDownAndUp)} 1s forwards ease-in-out;
`;

const ToastBox = styled.div`
  animation: ${({ isSending }) => (isSending ? moveRight : moveLeft)} 1s forwards ease-in-out;
  display: flex;
`;

const ToastIcon = styled.div`
  width: 20%;
`;
