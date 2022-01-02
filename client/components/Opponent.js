import React, { useState, useEffect, useContext, memo } from 'react';
import styled from '@emotion/styled';

import OpponentStatusContext from '@contexts/opponentStatus';

import Arena from '@components/Arena';
import Display from '@components/Display';
import CatJam from '@components/CatJam';

import useMounted from '@hooks/useMounted';

import { createArena } from '@utils/gameHelper';

const Opponent = ({ socketRef, catJamBgmRef, opponentNickname }) => {
  const {
    state,
    actions: { setScore, setLevel },
  } = useContext(OpponentStatusContext);

  const [arena, setArena] = useState(createArena());
  const mounted = useMounted();

  useEffect(() => {
    if (!socketRef?.current) return;

    const socket = socketRef.current;
    socket.on('arena-updated', (newArena) => {
      if (!mounted) return;
      setArena(newArena);
    });
    socket.on('score-updated', (score) => setScore(score));
    socket.on('level-updated', (level) => setLevel(level));

    return () => {
      socket.off('arena-updated');
      socket.off('score-updated');
      socket.off('level-updated');
    };
  }, [socketRef, mounted, setScore, setLevel]);

  return (
    <TetrisWrapper>
      <TetrisGame>
        <Arena arena={arena} {...state} />
        <aside>
          <Display title="Nickname">{opponentNickname ? opponentNickname : 'waiting'}</Display>
          <Display title="Level">{state.level}</Display>
          <Display title="Score">{state.score}</Display>
        </aside>
      </TetrisGame>
      {state.catJamming && <CatJam catJamBgmRef={catJamBgmRef} isOpponent={true} />}
    </TetrisWrapper>
  );
};

export default memo(Opponent);

const TetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const TetrisGame = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
