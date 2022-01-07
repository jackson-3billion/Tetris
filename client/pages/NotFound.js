import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { AiFillBug } from 'react-icons/ai';

const NotFound = () => {
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
      <Box>
        <Title>
          <AiFillBug color="#0094d2" />
          &nbsp;404
        </Title>
        <Subtitle>Page Not Found</Subtitle>
        <Message>
          <div>The page you requested could not be found.</div>
          <div>You will be redirected to main page</div>
        </Message>
        <Counter>{count}</Counter>
      </Box>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #292929;
`;

const Box = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  border: 2px solid white;
  width: 40%;
  height: 50%;
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
  font-size: 3.6rem;
  width: 100%;
  padding-left: 2rem;
  background-color: #4a5355;
  color: #99d4ed;
`;

const Subtitle = styled.div`
  text-align: center;
  font-size: 4rem;
  margin-top: 1rem;
`;

const Message = styled.div`
  margin-top: 1rem;
  & > div {
    font-size: 2rem;
  }
`;

const Counter = styled.div`
  font-size: 5rem;
  color: white;
`;
