import React, { useState } from 'react';
import styled from '@emotion/styled';

import useModal from '@hooks/useModal';

import Button from '@components/Button';
import EmailSender from '@components/EmailSender';
import LoadingDots from '@components/LoadingDots';

const Invite = ({ gameRoomId, nickname }) => {
  const modalStyles = {
    padding: '0',
    width: '40%',
    height: '50%',
    minWidth: '650px',
    minHeight: '400px',
    backgroundColor: '#737373',
    overlayColor: 'none',
  };
  const [isModalOpen, openModal, hideModal, ModalContainer] = useModal({ closableOverlay: true, styles: modalStyles });
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(gameRoomId).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

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
        <CopyButton callback={copyToClipboard} backgroundColor="#9b59b6">
          {isCopied ? 'Copied!😎' : 'Copy Room ID'}
        </CopyButton>
      </Buttons>
      {isModalOpen && (
        <ModalContainer>
          <EmailSender gameRoomId={gameRoomId} nickname={nickname} hideModal={hideModal} />
        </ModalContainer>
      )}
    </Wrapper>
  );
};

export default Invite;

const Wrapper = styled.div`
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
  padding-left: 5rem;
  height: fit-content;
`;

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
    border: 2px solid white;
    font-weight: bold;
  }
`;
