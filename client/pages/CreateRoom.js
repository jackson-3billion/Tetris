import React from 'react';
import { useNavigate } from 'react-router';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';

import useInput from '@hooks/useInput';
import useValidate from '@hooks/useValidate';

import { nicknameValidator } from '@utils/validate';

const CreateRoom = () => {
  const [nickname, handleInputChange] = useInput('');
  const [isValid, msg] = useValidate(nickname, nicknameValidator);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate(`/game/${uuid()}`, { state: nickname.trim() });
    }
  };

  const handleClickHome = () => {
    navigate('/');
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <InnerWrapper>
        <input value={nickname} onChange={handleInputChange} placeholder="닉네임을 입력해 주세요." />
        <Warning visible={!!nickname.length} isValid={isValid}>
          {msg}
        </Warning>
      </InnerWrapper>
      <button disabled={!isValid}>방 만들기</button>
      <Home onClick={handleClickHome}>처음으로</Home>
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
    background-color: #d5cabd;
    &:hover {
      cursor: pointer;
    }
  }
`;

const InnerWrapper = styled.div`
  width: 30%;
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
`;

const Warning = styled.div`
  color: ${({ isValid }) => (isValid ? '#07bc0c' : '#e74c3c')};
  margin-top: 3px;
  padding-left: 10px;
  font-size: 0.9rem;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

const Home = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  &:hover {
    cursor: pointer;
  }
  // make as layout component
`;
