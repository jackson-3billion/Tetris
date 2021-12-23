import React from 'react';
import styled from '@emotion/styled';

const ItemToast = ({ name, description, delay }) => {
  return (
    <ToastBox>
      <ToastMsg>
        {name}:{description}
      </ToastMsg>
    </ToastBox>
  );
};

export default ItemToast;

const ToastBox = styled.div``;

const ToastMsg = styled.div``;
