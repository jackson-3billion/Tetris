import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Arena from '@components/Arena';
import Display from '@components/Display';

import { createArena } from '@utils/gameHelper';

const Opponent = ({ socketRef }) => {
  const [arena, setArena] = useState(createArena());

  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.on('arena-updated', ({ arena: newArena }) => setArena(newArena));
    }
  }, [socketRef]);

  return (
    <TetrisWrapper>
      <TetrisGame>
        <Arena arena={arena} />
        <aside>
          <Display text="opponent" />
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
