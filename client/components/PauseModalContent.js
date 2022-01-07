import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { ImPause } from 'react-icons/im';
import { FaPlay } from 'react-icons/fa';
import { lighten } from 'polished';

import Button from '@components/Button';

const PauseModalContent = ({ callback, pauser }) => {
  const focusRef = useRef();

  useEffect(() => setTimeout(() => focusRef?.current?.focus(), 10), []);

  const handleKeyDown = ({ key }) => {
    if (key === 'P' || key === 'p') {
      callback();
    }
  };

  return (
    <Wrapper ref={focusRef} role="button" tabIndex="0" onKeyDown={handleKeyDown}>
      <Header>
        <ImPause size="2rem" />
        <Title>PAUSED</Title>
      </Header>
      <Msg>
        Player <span>{pauser}</span> paused the game
      </Msg>
      <ResumeButton callback={callback} backgroundColor="crimson">
        <FaPlay size="3rem" color="white" />
      </ResumeButton>
    </Wrapper>
  );
};

export default PauseModalContent;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:focus {
    outline: none;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0 2rem;
  //background-color: #1f1f1f;
  background-color: #4c4c4c;
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
  padding: 0 2rem;
  & > span {
    font-weight: bold;
    font-size: 2.5rem;
    color: #e19895;
  }

  @media all and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const ResumeButton = styled(Button)`
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  border-radius: 10px;
  padding: 1rem 0;
  &:hover {
    background-color: ${lighten(0.1, 'crimson')};
  }
`;
