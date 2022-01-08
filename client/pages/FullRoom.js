import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { BiError } from 'react-icons/bi';

const FullRoom = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    if (count === 0) {
      navigate('/');
    }
  }, [count, navigate]);

  return (
    <Wrapper>
      <Title>
        <BiError color="yellow" />
        &nbsp;Room is Full
      </Title>
      <Message>
        <div>Sorry, You can't participate in the room.</div>
        <div>You will be redirected to main page</div>
      </Message>
      <Counter>{count}</Counter>
    </Wrapper>
  );
};

export default FullRoom;

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  border: 3px solid white;
  width: 40%;
  min-width: 640px;
  height: 50%;
  min-height: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #9a9392;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 3rem;
  width: 100%;
  padding-left: 2rem;
  background-color: #4a5355;
  color: white;
`;

const Message = styled.div`
  margin-top: 5rem;
  & > div {
    font-size: 2rem;
  }
`;

const Counter = styled.div`
  font-size: 5rem;
  color: white;
`;
