import React from 'react';
import styled from '@emotion/styled';

import useModal from '@hooks/useModal';

import Button from '@components/Button';
import EmailSender from '@components/EmailSender';
import LoadingDots from '@components/LoadingDots';

const Invite = () => {
  const modalStyles = {
    padding: '0',
    width: '40%',
    height: '50%',
    minWidth: '650px',
    minHeight: '400px',
    backgroundColor: '#121212',
    overlayColor: 'none',
  };
  const [isModalOpen, openModal, hideModal, ModalContainer] = useModal({ closableOverlay: true, styles: modalStyles });

  return (
    <Wrapper>
      <Msg>
        Waiting For Another Player
        <LoadingDots />
      </Msg>
      <Buttons>
        <InviteButton callback={openModal} backgroundColor="#2ecc71">
          Invite
        </InviteButton>
        <CopyButton backgroundColor="#9b59b6">Copy Room ID</CopyButton>
      </Buttons>
      {isModalOpen && (
        <ModalContainer>
          <EmailSender hideModal={hideModal} />
        </ModalContainer>
      )}
    </Wrapper>
  );
};

export default Invite;

const Wrapper = styled.div`
  border: 2px solid salmon;
  width: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Msg = styled.div`
  font-size: 3vw;
  width: 100%;
  text-align: center;
  height: fit-content;

  /* @media all and(min-width: 801px) and (max-width: 1000px) {
    font-size: 2rem;
    background-color: red;
  }

  @media all and (min-width: 601px) and (max-width: 800px) {
    font-size: 1.5rem;
    background-color: blue;
  }

  @media all and (max-width: 600px) {
    font-size: 1.2rem;
    background-color: yellow;
  } */
`;

// const EmptyDots = styled.span`
//   color: transparent;
// `;

// const LoadingIndicator = styled.span``;

const InviteButton = styled(Button)``;

const CopyButton = styled(Button)``;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 10vh;
  & > ${InviteButton}, ${CopyButton} {
    margin: 0;
    padding: 0;
    width: 40%;
    padding: 0.5rem;
    font-size: 1.8vw;
    border-radius: 30px;
  }
`;
