import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { darken } from 'polished';

import { rankList } from '@utils/dummy';

const ordinalMapper = ['st', 'nd', 'rd', 'th', 'th'];

const Main = () => {
  return (
    <Wrapper>
      <Title>Tetris </Title>
      <RankList>
        {rankList.map(({ score, nickname }, idx) => (
          <RankItem key={idx}>
            <Rank>
              <span>{idx + 1}</span>
              <span>{ordinalMapper[idx]}</span>
            </Rank>
            <Score>{score}</Score>
            <Nickname>{nickname}</Nickname>
          </RankItem>
        ))}
      </RankList>
      <Buttons>
        <LinkButton to="/game/create" color="#FF9671">
          Create
        </LinkButton>
        <LinkButton to="/game/join" color="#00C9A7">
          Join
        </LinkButton>
      </Buttons>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #191919;
  color: #f6f7fb;
`;

const Title = styled.div`
  margin-top: -10%;
  font-size: 10rem;
`;

const RankList = styled.div`
  width: 20%;
  min-width: 300px;
`;

const RankItem = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
  text-align: right;
`;

const Rank = styled.span`
  flex-basis: 20%;
  text-align: left;
  & > span:nth-of-type(2) {
    font-size: 1.5rem;
  }
`;

const Score = styled.span`
  flex-basis: 40%;
`;

const Nickname = styled.span`
  flex-basis: 40%;
`;

const Buttons = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  min-width: 350px;
  @media all and (max-width: 600px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const LinkButton = styled(Link)`
  min-width: 150px;
  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  padding: 0.3rem;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: ${({ color }) => color};

  &:hover {
    background-color: ${({ color }) => darken(0.1, color)};
  }

  @media all and (max-width: 600px) {
    width: 48%;
  }
`;
