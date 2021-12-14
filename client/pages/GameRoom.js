import React, { useState, useEffect, useReducer } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import useSocket from '@hooks/useSocket';

import Tetris from '@components/Tetris';
import Opponent from '@components/Opponent';

const GameRoom = () => {
  const navigate = useNavigate();
  const { id: gameRoomId } = useParams();
  const { state: nickname } = useLocation();
  const socketRef = useSocket(`http://localhost:9000`);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { joined, started, isHost, isReady, opponentNickname } = state;

  const onStateChange = (key) => (value) => dispatch({ payload: { [key]: value } });

  console.log(state);

  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.emit('join', gameRoomId);
      socket.on('joined', (playerNum) => {
        dispatch({ payload: { joined: true } });
        if (playerNum === 0) {
          dispatch({ payload: { isHost: true } });
        }
      });
      socket.on('isTwoPlayer', () => socket.emit('nickname', nickname));
      socket.on('nickname', (nickname) => dispatch({ payload: { opponentNickname: nickname } }));
      socket.on('isReady', (isReady) => dispatch({ payload: { isReady } }));
      socket.on('full', () => navigate('/game/full'));
      socket.on('end', () => {
        console.log('opponent left the game');
        dispatch({
          payload: {
            started: false,
            isHost: true,
            opponentNickname: '',
          },
        });
        // setOpponentNickname('');
        // setStarted(false);
        // setIsHost(true);
      });
    }
  }, [socketRef, gameRoomId, nickname, navigate]);

  return (
    <>
      {joined && (
        <Wrapper>
          <Tetris
            started={started}
            setStarted={onStateChange('started')}
            isOpponentReady={isReady}
            socketRef={socketRef}
            isHost={isHost}
          />
          {!!opponentNickname && <Opponent socketRef={socketRef} opponentNickname={opponentNickname} />}
        </Wrapper>
      )}
      {!joined && <div>loading</div>}
    </>
  );
};

export default GameRoom;

const initialState = {
  joined: false,
  started: false,
  isHost: false,
  isReady: false,
  opponentNickname: '',
};

const reducer = (state, action) => ({ ...state, ...action.payload });

const Wrapper = styled.div`
  display: flex;
`;
