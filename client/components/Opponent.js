import React, { useState, useEffect, useContext, memo } from 'react';
import styled from '@emotion/styled';

import OpponentStatusContext from '@contexts/opponentStatus';

import Arena from '@components/Arena';
import Display from '@components/Display';
import CatJam from '@components/CatJam';

import useMounted from '@hooks/useMounted';

import { createArena } from '@utils/gameHelper';

const Opponent = ({ socketRef, catJamBgmRef, opponentNickname }) => {
  const { state } = useContext(OpponentStatusContext);

  const [arena, setArena] = useState(createArena());
  const mounted = useMounted();

  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.on('arena-updated', (newArena) => {
        if (!mounted) return;
        setArena(newArena);
      });
    }
  }, [socketRef, mounted]);

  return (
    <TetrisWrapper>
      <TetrisGame>
        <Arena arena={arena} {...state} />
        <aside>
          <Display text={opponentNickname ? opponentNickname : 'waiting'} />
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
  //background: gray;
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
