import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import useSocket from '@hooks/useSocket';

import Tetris from '@components/Tetris';
import Opponent from '@components/Opponent';

const GameRoom = () => {
  const { id: gameRoomId } = useParams();
  const { state: nickname } = useLocation();
  const navigate = useNavigate();
  const socketRef = useSocket(`http://localhost:9000`);

  const [joined, setJoined] = useState(false);
  const [started, setStarted] = useState(false);
  const [opponentNickname, setOpponentNickname] = useState('');

  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.emit('join', gameRoomId);
      socket.on('joined', () => setJoined(true));
      socket.on('isTwoPlayer', () => {
        socket.emit('nickname', nickname);
      });
      socket.on('nickname', (nickname) => setOpponentNickname(nickname));
      socket.on('full', () => navigate('/game/full'));
      socket.on('end', () => {
        console.log('opponent left the game');
        setOpponentNickname('');
        setStarted(false);
      });
    }
  }, [socketRef, gameRoomId, nickname, navigate]);

  return (
    <>
      {!joined && <div>loading</div>}
      {joined && (
        <Wrapper>
          <Tetris started={started} setStarted={setStarted} socketRef={socketRef} />
          {!!opponentNickname && <Opponent socketRef={socketRef} opponentNickname={opponentNickname} />}
        </Wrapper>
      )}
    </>
  );
};

export default GameRoom;

const Wrapper = styled.div`
  display: flex;
`;
