import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';

import useSocket from '@hooks/useSocket';

import Tetris from '@components/Tetris';
import Opponent from '@components/Opponent';

const GameRoom = () => {
  const { id: gameRoomId } = useParams();
  const socketRef = useSocket(`http://localhost:9000`);

  const [started, setStarted] = useState(false);
  const [hasOpponent, setHasOpponent] = useState(false);

  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.emit('enter', gameRoomId);
      socket.on('waiting', (data) => console.log(data));
      socket.on('start', () => setHasOpponent(true));
      socket.on('full', (data) => console.log(data));
      socket.on('end', () => {
        console.log('opponent left the game');
        setStarted(false);
      });
    }
  }, [socketRef, gameRoomId]);

  return (
    <Wrapper>
      <Tetris started={started} setStarted={setStarted} socketRef={socketRef} />
      {hasOpponent && <Opponent socketRef={socketRef} />}
    </Wrapper>
  );
};

export default GameRoom;

const Wrapper = styled.div`
  display: flex;
`;
