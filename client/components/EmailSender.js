import React, { useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { lighten } from 'polished';
import { GoMail } from 'react-icons/go';
import { FiSend } from 'react-icons/fi';

import useInput from '@hooks/useInput';
import useFocus from '@hooks/useFocus';
import useValidate from '@hooks/useValidate';

import Button from '@components/Button';

import { emailValidator } from '@utils/validate';

const EmailSender = ({ hideModal }) => {
  const emailRef = useRef();
  const { id: gameRoomId } = useParams();
  const { state: nickname } = useLocation();

  const [email, handler] = useInput('');
  const [isValidEmail, msg] = useValidate(email, emailValidator);

  useFocus(emailRef);

  const handleSendClick = () => {
    axios.post('/email', { email, gameRoomId, inviter: nickname }).then((res) => console.log(res));
  };

  return (
    <Wrapper>
      <CloseBtn onClick={hideModal}>&times;</CloseBtn>
      <Header>
        <GoMail size="2rem" />
        <Title>Send Email</Title>
      </Header>
      <Msg>Invite Your Friend to Tetris Game!🎮</Msg>
      <InputWrapper>
        <Email ref={emailRef} onChange={handler} value={email} placeholder="Friend's Email" />
        {!!email.length && <ValidationMsg isValid={isValidEmail}>{msg}</ValidationMsg>}
        <SendButton onClick={handleSendClick} disabled={!isValidEmail} backgroundColor="#428bc7">
          <FiSend color="white" />
        </SendButton>
      </InputWrapper>
      <CancelButton onClick={hideModal}>CANCEL</CancelButton>
    </Wrapper>
  );
};

export default EmailSender;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: -1rem;
  right: 0.3rem;
  font-size: 2.5rem;
  color: #616161;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0 2rem;
  background-color: #1f1f1f;
  display: flex;
  align-items: center;
  position: absolute;
  top: 2rem;
  color: white;
`;

const Title = styled.div`
  font-size: 2rem;
  margin-left: 1rem;
`;

const Msg = styled.div`
  font-size: 2rem;
  color: white;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 2rem;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Email = styled.input`
  border: 1px solid white;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  width: 100%;
  height: 3rem;
  font-size: 1.5rem;
  padding-left: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const ValidationMsg = styled.div`
  position: absolute;
  top: 3rem;
  left: 2rem;
  font-size: 1.2rem;
  color: ${({ isValid }) => (isValid ? '#07bc0c' : '#e74c3c')};
`;

const SendButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 3rem;
  margin: 0;
  padding: 0;
  font-size: 1.8rem;
  font-weight: bold;
  border-radius: 0px;
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  margin-left: -1px;
  &:hover {
    background-color: ${lighten(0.1, '#428bc7')};
  }
`;

const CancelButton = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 2rem;
  font-size: 1.5rem;
  text-align: right;
  color: white;
  &:hover {
    cursor: pointer;
    color: salmon;
  }
`;
