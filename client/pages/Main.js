import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { rankList } from '@utils/dummy';

const ordinalMapper = ['st', 'nd', 'rd', 'th', 'th'];

const Main = () => {
  return (
    <Wrapper>
      <Title>Tetris </Title>
      <RankList>
        {rankList.map(({ score, nickname }, idx) => (
          <RankItem>
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
  border: 1px solid green;
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
  border: 1px solid crimson;
`;

const RankList = styled.div`
  //border: 1px solid purple;
  width: 20%;
  min-width: 300px;
`;

const RankItem = styled.div`
  //border: 1px solid salmon;
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
  text-align: right;
`;

const Rank = styled.span`
  flex-basis: 20%;
  //border: 1px solid yellow;
  & > span:nth-of-type(2) {
    font-size: 1.5rem;
  }
`;

const Score = styled.span`
  flex-basis: 40%;
  //border: 1px solid yellow;
`;

const Nickname = styled.span`
  flex-basis: 40%;
  //border: 1px solid yellow;
`;

const Buttons = styled.div`
  border: 2px solid green;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  //min-width: 300px;
  min-width: 250px;
`;

const LinkButton = styled(Link)`
  flex-basis: 3rem;
  min-width: 100px;
  text-align: center;
  text-decoration: none;
  color: white;
  //border: 1px solid orange;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: ${({ color }) => color};
`;
