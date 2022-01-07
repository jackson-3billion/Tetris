import React, { useState, useEffect, useContext, memo } from 'react';
import styled from '@emotion/styled';

import OpponentStatusContext from '@contexts/opponentStatus';

import Arena from '@components/Arena';
import Display from '@components/Display';
import Preview from '@components/Preview';
import CatJam from '@components/CatJam';

import useMounted from '@hooks/useMounted';

import { createArena } from '@utils/gameHelper';

const Opponent = ({ socketRef, catJamBgmRef, opponentNickname, isReady }) => {
  const {
    state,
    actions: { setScore, setLevel, setPreview },
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
    socket.on('preview-updated', (preview) => setPreview(preview));

    return () => {
      socket.off('arena-updated');
      socket.off('score-updated');
      socket.off('level-updated');
    };
  }, [socketRef, mounted, setScore, setLevel, setPreview]);

  return (
    <TetrisWrapper>
      <TetrisGame>
        <aside>
          <Display title="next">
            <Preview tetromino={state.preview} />
          </Display>
          <Display title="Nickname">{opponentNickname ? opponentNickname : 'waiting'}</Display>
          <Display title="Level">{state.level}</Display>
          <Display title="Score">{state.score}</Display>
        </aside>
        <Arena isReady={isReady} arena={arena} {...state} />
      </TetrisGame>
      {state.catJamming && <CatJam catJamBgmRef={catJamBgmRef} isOpponent={true} />}
    </TetrisWrapper>
  );
};

export default memo(Opponent);

const TetrisWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  @media all and (max-width: 500px) {
    display: none;
  }
`;

const TetrisGame = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 140px;
    display: block;
    padding: 0 20px;
  }
`;
