import React, { memo } from 'react';
import styled from '@emotion/styled';

const Display = ({ title, children }) => {
  return (
    <StyledDisplay>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </StyledDisplay>
  );
};

export default memo(Display); // re-rendering 방지

const StyledDisplay = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #999;
  height: 100px;
`;

const Title = styled.div`
  font-size: 1.2rem;
`;

const Content = styled.div`
  font-size: 1.4rem;
  width: 100%;
  text-align: right;
  font-weight: bold;
  color: white;
`;
