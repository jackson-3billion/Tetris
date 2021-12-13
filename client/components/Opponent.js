import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import Arena from '@components/Arena';
import Display from '@components/Display';

import useMounted from '@hooks/useMounted';

import { createArena } from '@utils/gameHelper';

const Opponent = ({ socketRef, opponentNickname }) => {
  const [arena, setArena] = useState(createArena());
  const mountedRef = useMounted();

  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.on('arena-updated', ({ arena: newArena }) => {
        if (!mountedRef.current) return;
        setArena(newArena);
      });
    }
  }, [socketRef, mountedRef]);

  return (
    <TetrisWrapper>
      <TetrisGame>
        <Arena arena={arena} />
        <aside>
          <Display text={opponentNickname ? opponentNickname : 'waiting'} />
        </aside>
      </TetrisGame>
    </TetrisWrapper>
  );
};

export default Opponent;

const TetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: gray;
  overflow: hidden;
`;

const TetrisGame = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    //width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
