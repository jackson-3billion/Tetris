import React from 'react';
import styled from '@emotion/styled';

const ItemToast = ({ message }) => {
  return (
    <ToastBox>
      <ToastMsg>{message}</ToastMsg>
    </ToastBox>
  );
};

export default ItemToast;

const ToastBox = styled.div``;

const ToastMsg = styled.msg``;
