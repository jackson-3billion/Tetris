import React from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const Modal = ({ children, closableOverlay, hideModal, styles }) => {
  const handleOverlayClick = () => {
    if (closableOverlay) {
      hideModal();
    }
  };

  return createPortal(
    <>
      <Overlay onClick={handleOverlayClick} backgroundColor={styles?.overlayColor} />
      <ModalContainer {...styles}>{children}</ModalContainer>
    </>,
    document.getElementById('modal'),
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'black')};
  opacity: ${({ opacity }) => (opacity ? opacity : 0.2)};
  z-index: 2;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: ${({ width }) => (width ? width : '40%')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : '650px')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : '400px')};
  height: ${({ height }) => (height ? height : '50%')};
  margin: auto;
  padding: ${({ padding }) => (padding ? padding : 0)};
  border-radius: 5px;
  background: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'white')};
  z-index: 3;
  box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);

  @media all and (max-width: 600px) {
    width: 95%;
    min-width: 0;
  }
`;
