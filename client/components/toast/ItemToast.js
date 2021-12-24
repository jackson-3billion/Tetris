import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { itemMapper } from '@utils/items';

const ItemToast = ({ name, description, isSending }) => {
  return (
    <Wrapper isSending={isSending}>
      <ToastBox isSending={isSending}>
        <ToastIcon>{itemMapper[name]}</ToastIcon>
        {/* <ToastMsg>{description}</ToastMsg> */}
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
  position: relative;
  animation: ${({ isSending }) => (isSending ? moveUpAndDown : moveDownAndUp)} 1s forwards ease-in-out;
`;

const ToastBox = styled.div`
  position: relative;
  animation: ${({ isSending }) => (isSending ? moveRight : moveLeft)} 1s forwards ease-in-out;
  display: flex;
`;

const ToastIcon = styled.div`
  width: 20%;
`;

const ToastMsg = styled.div`
  color: white;
  font-weight: bold;
`;
