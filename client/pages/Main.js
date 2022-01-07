import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BiError } from 'react-icons/bi';

import Logo from '@components/Logo';
import LoadingDots from '@components/LoadingDots';

const ordinalMapper = ['st', 'nd', 'rd', 'th', 'th'];

const Main = () => {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    axios
      .get('/players')
      .then(({ data: { data } }) => {
        setList(data);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsFetching(false));
  }, []);

  return (
    <Wrapper>
      <Logo />
      <RankList isError={isError || isFetching}>
        <Title>Best Players</Title>
        {isError && (
          <Error>
            <BiError size="100%" />
            <div>Sorry! Server is not available now</div>
          </Error>
        )}
        {isFetching && <LoadingDots />}
        {list.map(({ score, nickname }, idx) => (
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
        <LinkButton to="/game/create" hovercolor="#0f8a5f">
          Create
        </LinkButton>
        <LinkButton to="/game/join" hovercolor="#0083D4">
          Join
        </LinkButton>
      </Buttons>
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: black;
  color: #f6f7fb;
`;

const Error = styled.div`
  margin: 0 auto;
  width: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    text-align: center;
    font-size: 1.2rem;
  }
`;

const RankList = styled.div`
  width: 27%;
  min-width: 300px;

  text-align: center;
  ${({ isError }) => {
    isError &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `;
  }};
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
  flex-basis: 10%;
  text-align: left;
  & > span:nth-of-type(2) {
    font-size: 1.5rem;
  }
`;

const Score = styled.span`
  flex-basis: 30%;
`;

const Nickname = styled.span`
  flex-basis: 60%;
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
    background-color: ${({ hovercolor }) => hovercolor};
    border-color: ${({ hovercolor }) => hovercolor};
  }

  @media all and (max-width: 600px) {
    width: 48%;
  }
`;
