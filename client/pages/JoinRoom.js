import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router';

import useInput from '@hooks/useInput';
import useValidate from '@hooks/useValidate';

import { nicknameValidator } from '@utils/validate';

const JoinRoom = () => {
  const navigate = useNavigate();
  const [nickname, handleNicknameChange] = useInput('');
  const [gameRoomId, handleGameRoomIdChange] = useInput('');
  const [isValidNickname, msg] = useValidate(nickname, nicknameValidator);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!isValidNickname) {
      return;
    }
    // server 로 axios 요청 => gameRoomId로 만들어진 방의 존재여부 확인
    // false => modal => "존재하지 않는 gameRoom 입니다"
    // true => navigate

    navigate(`/game/${gameRoomId}`, { state: nickname });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleJoinRoom}>
        <InputWrapper>
          <input value={nickname} onChange={handleNicknameChange} placeholder="Nickname" />
          <Warning visible={!!nickname.length} isValid={isValidNickname}>
            {msg}
          </Warning>
          <input value={gameRoomId} onChange={handleGameRoomIdChange} placeholder="Room ID" />
        </InputWrapper>
        <button disabled={!isValidNickname || !gameRoomId.length}>Join Game</button>
      </Form>
    </Wrapper>
  );
};

export default JoinRoom;

const Wrapper = styled.div`
  height: 100vh;
  background-color: #e9eaed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > button {
    width: 10%;
    min-width: 160px;
    margin-top: 3rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    background-color: #d2aa87;
    box-shadow: 10px 10px 14px 1px rgb(0 0 0 / 20%);
    transition: all 0.3s ease-in;

    &:hover:disabled {
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      cursor: pointer;
      box-shadow: none;
      transition: all 0.3s ease-in;
    }

    @media all and (max-width: 600px) {
      width: 90%;
      margin-top: 2.5rem;
    }
  }
`;

const InputWrapper = styled.div`
  width: 30%;
  min-width: 250px;

  & > input {
    width: 100%;
    height: 3rem;
    padding-left: 10px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  }

  @media all and (max-width: 600px) {
    width: 90%;
  }
`;

const Warning = styled.div`
  margin: 3px 0px 1rem;
  padding-left: 10px;
  font-size: 0.9rem;
  color: ${({ isValid }) => (isValid ? '#07bc0c' : '#e74c3c')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;
