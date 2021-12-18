import React from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

const Modal = ({ hideModal, children }) => {
  return createPortal(
    <>
      <Overlay onClick={hideModal} />
      <ModalContainer>
        <CloseBtn onClick={hideModal}>&times;</CloseBtn>
        <Content>{children}</Content>
      </ModalContainer>
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
  background-color: ${({ color }) => (color ? color : 'black')};
  opacity: ${({ opacity }) => (opacity ? opacity : 0.2)};
  z-index: 2;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 60%;
  height: 80%;
  margin: auto;
  padding: 3rem;
  border-radius: 5px;
  background: white;
  z-index: 3;
  box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 1.5rem;
  color: #333333;
  font-size: 3rem;
  &:hover {
    cursor: pointer;
    color: crimson;
  }
`;

const Content = styled.div``;
