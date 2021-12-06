import React from 'react';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';

import useInput from '@hooks/useInput';
import useValidate from '@hooks/useValidate';

import { nicknameValidator } from '@utils/validate';

import Home from '@components/Home';

const CreateRoom = () => {
  const [nickname, handleInputChange] = useInput('');
  const [isValid, msg] = useValidate(nickname, nicknameValidator);
  const navigate = useNavigate();

  const handleClickHome = () => navigate('/');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate(`/game/${uuid()}`, { state: nickname.trim() });
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <InnerWrapper>
        <input value={nickname} onChange={handleInputChange} placeholder="닉네임을 입력해 주세요." />
        <Warning visible={!!nickname.length} isValid={isValid}>
          {msg}
        </Warning>
      </InnerWrapper>
      <button disabled={!isValid}>Create Game</button>
      <Home onClick={handleClickHome} />
    </Wrapper>
  );
};

export default CreateRoom;

const Wrapper = styled.form`
  height: 100vh;
  background-color: #e9eaed;
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
    background-color: #d2aa87; //#d5cabd;

    &:hover {
      cursor: pointer;
    }

    @media all and (max-width: 600px) {
      width: 90%;
      margin-top: 0.5rem;
    }
  }
`;

const InnerWrapper = styled.div`
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
  margin-top: 3px;
  padding-left: 10px;
  font-size: 0.9rem;
  color: ${({ isValid }) => (isValid ? '#07bc0c' : '#e74c3c')};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;
