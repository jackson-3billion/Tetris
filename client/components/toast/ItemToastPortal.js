import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';

import ItemToast from '@components/toast/ItemToast';

const ItemToastPortal = forwardRef((_, ref) => {
  const [toasts, setToasts] = useState([]);

  useImperativeHandle(ref, () => ({
    addMessage(toast) {
      setToasts([...toasts, { ...toast, id: uuid() }]);
    },
  }));

  return ReactDOM.createPortal(
    <ToastContainer>
      {toasts.map((toast) => (
        <ItemToast key={toast.id} message={toast.message} delay={2000}></ItemToast>
      ))}
    </ToastContainer>,
    document.getElementById('item-sent'),
  );
});

export default ItemToastPortal;

const ToastContainer = styled.div`
  border: 2px solid green;
  position: absolute;
  top: 300px;
  left: calc(30%);
  width: 20%;
  height: 80px;
  //left: 50%;
  //transform: translate(-50%, -50%);
  //width: 15%;
`;
