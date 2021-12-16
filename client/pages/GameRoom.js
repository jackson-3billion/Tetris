import React, { useCallback, useEffect, useReducer } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import useSocket from '@hooks/useSocket';

import Tetris from '@components/Tetris';
import Opponent from '@components/Opponent';
import Timer from '@components/Timer';

const GameRoom = () => {
  const navigate = useNavigate();
  const { id: gameRoomId } = useParams();
  const { state: nickname } = useLocation();
  const socketRef = useSocket(`http://localhost:9000`);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { joined, started, paused, isHost, isReady, opponentNickname } = state;

  const onStateChange = useCallback((k) => (v) => dispatch({ payload: { [k]: v } }), []);

  useEffect(() => {
    if (!socketRef?.current) return;
    const socket = socketRef.current;
    socket.emit('join', gameRoomId);
    socket.on('joined', (playerNum) => {
      dispatch({ payload: { joined: true } });
      if (playerNum === 0) {
        dispatch({ payload: { isHost: true } });
      }
    });
    socket.on('isTwoPlayer', () => socket.emit('nickname', nickname));
    socket.on('nickname', (opponentNickname) => dispatch({ payload: { opponentNickname } }));
    socket.on('isReady', (isReady) => dispatch({ payload: { isReady } }));
    socket.on('start', () => dispatch({ payload: { started: true } }));
    socket.on('paused', (paused) => {
      console.log(`paused: ${paused}`);
      dispatch({ payload: { paused } });
    });
    socket.on('full', () => navigate('/game/full'));
    socket.on('end', () => {
      dispatch({
        payload: {
          started: false,
          isHost: true,
          opponentNickname: '',
        },
      });
    });
  }, [socketRef, gameRoomId, nickname, navigate]);

  return (
    <>
      {joined && (
        <Wrapper>
          <Timer started={started} paused={paused} />
          <Tetris
            started={started}
            setStarted={onStateChange('started')}
            paused={paused}
            isHost={isHost}
            isOpponentReady={isReady}
            socketRef={socketRef}
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
  paused: false,
  isHost: false,
  isReady: false,
  opponentNickname: '',
};

const reducer = (state, action) => ({ ...state, ...action.payload });

const Wrapper = styled.div`
  display: flex;
`;
