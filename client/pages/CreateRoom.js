import React, { useState } from 'react';
import styled from '@emotion/styled';

import useInput from '@hooks/useInput';

const CreateRoom = () => {
  const [nickname, setNickname, handler] = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submiitted');
    console.log(nickname);
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <input value={nickname} onChange={handler} placeholder="닉네임을 입력해 주세요." />
      <button>방 만들기</button>
    </Wrapper>
  );
};

export default CreateRoom;

const Wrapper = styled.form`
  height: 100vh;
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > input {
    width: 25%;
    height: 3rem;
    padding-left: 10px;
    font-size: 1.2rem;
  }
  & > button {
    width: 10%;
    min-width: 200px;
    margin-top: 3rem;
    padding: 0.5rem 1rem;
    border: none;
    font-size: 1.2rem;
    &:hover {
      cursor: pointer;
    }
  }
`;
