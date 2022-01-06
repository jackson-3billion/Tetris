import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { lighten } from 'polished';
import { GrGamepad } from 'react-icons/gr';

import StatusContext from '@contexts/status';
import OpponentStatusContext from '@contexts/opponentStatus';

import Button from '@components/Button';

const GameOverModalContent = ({ rank, callback }) => {
  const {
    state: { score },
  } = useContext(StatusContext);
  const {
    state: { finalScore: opponentFinalScore },
  } = useContext(OpponentStatusContext);

  const getResult = () => {
    if (score > opponentFinalScore) {
      return ['WIN', '🥳', '#66D79B'];
    } else if (score < opponentFinalScore) {
      return ['LOSE', '😭', '#E56450'];
    } else {
      return ['DRAW', '🤔', '#fafad2'];
    }
  };

  return (
    <Wrapper>
      <Header>
        <GrGamepad size="2rem" />
        <Title>Game Over</Title>
      </Header>
      <Msg color={getResult()[2]}>
        {getResult()[0]} <span>{getResult()[1]}</span>
      </Msg>
      <Stats>
        <div>
          Rank: <span>{rank ? rank : 'unranked'}</span>
        </div>
        <div>
          score: <span>{score}</span>
        </div>
        <div>
          Opponent score: <span>{opponentFinalScore}</span>
        </div>
      </Stats>
      <ReplayButton callback={callback} backgroundColor="crimson">
        Play again!
      </ReplayButton>
    </Wrapper>
  );
};

export default GameOverModalContent;

const rotateLeftRight = keyframes`
  25% { transform: rotate(15deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-15deg); }
 100% { transform: rotate(0deg); }
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0 2rem;
  background-color: #4c4c4c;
  display: flex;
  align-items: center;
  position: absolute;
  top: 2rem;
  color: white;

  & > svg {
    & > path {
      stroke: white;
    }
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
`;

const Msg = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: ${({ color }) => color};
  padding: 0 2rem;

  & > span {
    display: inline-block;
    animation: ${rotateLeftRight} 1s infinite linear;
  }
`;

const Stats = styled.div`
  font-size: 1.6rem;

  & > div > span {
    font-weight: bold;
    color: #ffa54c;
  }
`;

const ReplayButton = styled(Button)`
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  border-radius: 10px;
  padding: 1rem 0;
  background-color: #009efa;
  font-size: 1.4rem;
  &:hover {
    background-color: ${lighten(0.1, '#009EFA')};
  }
`;
