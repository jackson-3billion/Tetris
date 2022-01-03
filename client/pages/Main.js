import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { lighten, darken } from 'polished';

import { rankList } from '@utils/dummy';

import Logo from '@components/Logo';

const ordinalMapper = ['st', 'nd', 'rd', 'th', 'th'];

const Main = () => {
  return (
    <Wrapper>
      <Logo />
      <RankList>
        <Title>Best Players</Title>
        {rankList.map(({ score, nickname }, idx) => (
          <RankItem key={idx} idx={idx}>
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
  justify-content: space-evenly;
  align-items: center;
  background-color: black;
  color: #f6f7fb;
`;

const RankList = styled.div`
  width: 20%;
  min-width: 300px;
`;

const Title = styled.div`
  font-size: 2.2rem;
  text-align: center;
`;

const RankItem = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 2rem;
  text-align: right;
  color: ${({ idx }) => (idx === 0 ? 'gold' : 'white')};
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
  border: 2px solid gray;
  padding: 4px;
  font-size: 1.5rem;
  font-weight: bold;

  &:hover {
    background-color: ${lighten(0.4, 'black')};
    border-color: ${lighten(0.4, 'black')};
  }

  @media all and (max-width: 600px) {
    width: 48%;
  }
`;
