import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const LoadingIndicator = () => {
  return (
    <Spinner>
      <Bounce1 />
      <Bounce2 />
      <Bounce3 />
    </Spinner>
  );
};

export default LoadingIndicator;

const bounceDelay = keyframes`
 0%, 80%, 100% { transform: scale(0) }
  40% { transform: scale(1.0) }
`;

const Bounce1 = styled.div``;
const Bounce2 = styled.div``;
const Bounce3 = styled.div``;

const Spinner = styled.div`
  margin: auto auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  & > div {
    width: 1.8rem;
    height: 1.8rem;
    margin: 0 0.3rem;
    background-color: white;

    border-radius: 100%;
    display: inline-block;
    animation: ${bounceDelay} 1.4s infinite ease-in-out both;
  }

  & > ${Bounce1} {
    animation-delay: -0.32s;
  }

  & > ${Bounce2} {
    animation-delay: -0.16s;
  }
`;
