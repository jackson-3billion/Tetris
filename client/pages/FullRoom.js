import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

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
      <Message>
        <div>해당 게임에는 참가할 수 없습니다.</div>
        <div>다른 방에 참가해주세요!</div>
      </Message>
      <Counter>{count}</Counter>
    </Wrapper>
  );
};

export default FullRoom;

const Wrapper = styled.div``;

const Message = styled.div``;

const Counter = styled.div``;
