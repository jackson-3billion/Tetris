import React, { useCallback, useEffect, useReducer } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import useSocket from '@hooks/useSocket';
import useModal from '@hooks/useModal';

import Tetris from '@components/Tetris';
import Opponent from '@components/Opponent';
import Timer from '@components/Timer';
import Button from '@components/Button';

const GameRoom = () => {
  const navigate = useNavigate();
  const { id: gameRoomId } = useParams();
  const { state: nickname } = useLocation();
  const socketRef = useSocket(`http://localhost:9000`);
  const [isGameOverModalOpen, openGameOverModal, hideGameOverModal, GameOverModal] = useModal();
  const [isPauseModalOpen, openPauseModal, hidePauseModal, PauseModal] = useModal();

  const [state, dispatch] = useReducer(reducer, initialState);
  const { joined, started, paused, isHost, isReady, isGameOver, opponentNickname } = state;

  const handleStateChange = useCallback((k) => (v) => dispatch({ payload: { [k]: v } }), []);

  const handleResume = () => {
    const socket = socketRef?.current;
    socket.emit('resume');
  };

  useEffect(() => {
    if (!socketRef?.current) return;
    const socket = socketRef.current;
    socket.emit('join', gameRoomId);

    socket.on('joined', (playerNum) => dispatch({ payload: { joined: true, isHost: !playerNum } }));
    socket.on('isTwoPlayer', () => socket.emit('nickname', nickname));
    socket.on('full', () => navigate('/game/full'));
    socket.on('nickname', (opponentNickname) => dispatch({ payload: { opponentNickname } }));
    socket.on('isReady', (isReady) => dispatch({ payload: { isReady } }));
    socket.on('start', () => dispatch({ payload: { started: true, isGameOver: false, isWinner: false } }));
    socket.on('paused', (paused) => dispatch({ payload: { paused } }));
    socket.on('gameOver', (winner) => dispatch({ payload: { isGameOver: true, isWinner: nickname === winner } }));
    socket.on('opponentLeft', () => dispatch({ payload: { started: false, isHost: true, opponentNickname: '' } }));
  }, [socketRef, gameRoomId, nickname, navigate]);

  useEffect(() => {
    paused ? openPauseModal() : hidePauseModal();
  }, [paused, openPauseModal, hidePauseModal]);

  useEffect(() => {
    isGameOver ? openGameOverModal() : hideGameOverModal();
  }, [isGameOver, openGameOverModal, hideGameOverModal]);

  return (
    <>
      {!joined && <div>loading</div>}
      {joined && (
        <Wrapper>
          <Timer started={started} paused={paused} />
          <Tetris
            started={started}
            setStarted={handleStateChange('started')}
            paused={paused}
            isHost={isHost}
            isOpponentReady={isReady}
            socketRef={socketRef}
          />
          {!!opponentNickname && <Opponent socketRef={socketRef} opponentNickname={opponentNickname} />}
        </Wrapper>
      )}
      {isGameOverModalOpen && <GameOverModal>GAME OVER</GameOverModal>}
      {isPauseModalOpen && (
        <PauseModal>
          {/* <ModalMsg>PAUSED</ModalMsg> */}
          <Button text="RESUME" callback={handleResume} color="salmon" />
        </PauseModal>
      )}
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
  isGameOver: false,
  isWinner: false,
  opponentNickname: '',
};

const reducer = (state, action) => ({ ...state, ...action.payload });

const Wrapper = styled.div`
  display: flex;
`;
