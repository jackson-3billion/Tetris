import React, { useCallback, useEffect, useReducer, useRef, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import StatusContext from '@contexts/status';

import useSocket from '@hooks/useSocket';
import useModal from '@hooks/useModal';

import Tetris from '@components/Tetris';
import ItemSendPortal from '@components/toast/ItemSendPortal';
import ItemReceivePortal from '@components/toast/ItemReceivePortal';
import Opponent from '@components/Opponent';
import Timer from '@components/Timer';
import Button from '@components/Button';

import { ARENA_HEIGHT, ARENA_WIDTH } from '@utils/constants';

const GameRoom = () => {
  const {
    actions: { setAccel, setExplodingPos, setCatJamming, setRotated, setFlipped },
  } = useContext(StatusContext);

  const navigate = useNavigate();
  const { id: gameRoomId } = useParams();
  const { state: nickname } = useLocation();

  const socketRef = useSocket(`http://localhost:9000`);
  const sendPortalRef = useRef();
  const receivePortalRef = useRef();

  const [isGameOverModalOpen, openGameOverModal, hideGameOverModal, GameOverModal] = useModal();
  const [isPauseModalOpen, openPauseModal, hidePauseModal, PauseModal] = useModal();

  const [gameRoomState, dispatch] = useReducer(reducer, initialState);
  const { joined, playing, paused, isGameOver, opponentNickname } = gameRoomState;

  const handleStateChange = useCallback((k) => (v) => dispatch({ payload: { [k]: v } }), []);
  const handleResume = () => socketRef?.current?.emit('resume');

  const activateItem = useCallback((setter, delay) => {
    setter((activated) => {
      if (!activated) {
        setTimeout(() => setter(false), delay);
      }
      return true;
    });
  }, []);

  useEffect(() => {
    if (!socketRef?.current) return;
    const socket = socketRef.current;
    socket.emit('join', gameRoomId);

    socket.on('joined', (playerNum) => dispatch({ payload: { joined: true, isHost: !playerNum } }));
    socket.on('isTwoPlayer', () => socket.emit('nickname', nickname));
    socket.on('full', () => navigate('/game/full'));
    socket.on('nickname', (opponentNickname) => dispatch({ payload: { opponentNickname } }));
    socket.on('isReady', (isReady) => dispatch({ payload: { isReady } }));
    socket.on('start', () => dispatch({ payload: { playing: true, isGameOver: false, isWinner: false } }));
    socket.on('paused', (paused) => dispatch({ payload: { paused } }));
    socket.on('gameOver', (winner) => dispatch({ payload: { isGameOver: true, isWinner: nickname === winner } }));
    socket.on('opponentLeft', () => dispatch({ payload: { playing: false, isHost: true, opponentNickname: '' } }));

    socket.on('item', (item) => {
      receivePortalRef.current.addItem(item);
      switch (item.name) {
        case 'faster':
          return setAccel((prevAccel) => prevAccel + 1);
        case 'bomb':
          return setExplodingPos({
            y: Math.floor(Math.random() * (ARENA_HEIGHT / 2)) + 7,
            x: Math.floor(Math.random() * (ARENA_WIDTH - 4)),
          });
        case 'catjam':
          return activateItem(setCatJamming, 5000);
        case 'rotate':
          return activateItem(setRotated, 8000);
        case 'flip':
          return activateItem(setFlipped, 8000);
        default:
      }
    });
  }, [
    socketRef,
    gameRoomId,
    nickname,
    navigate,
    activateItem,
    setAccel,
    setExplodingPos,
    setCatJamming,
    setRotated,
    setFlipped,
  ]);

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
          <Timer playing={playing} paused={paused} />
          <Tetris
            gameRoomState={gameRoomState}
            setPlaying={handleStateChange('playing')}
            socketRef={socketRef}
            sendPortalRef={sendPortalRef}
          />

          {!!opponentNickname && (
            <>
              <ItemSendPortal ref={sendPortalRef} />
              <ItemReceivePortal ref={receivePortalRef} />
              <Opponent socketRef={socketRef} opponentNickname={opponentNickname} />
            </>
          )}
        </Wrapper>
      )}
      {isGameOverModalOpen && <GameOverModal>GAME OVER</GameOverModal>}
      {isPauseModalOpen && (
        <PauseModal>
          <Button text="RESUME" callback={handleResume} color="salmon" />
        </PauseModal>
      )}
    </>
  );
};

export default GameRoom;

const initialState = {
  joined: false,
  playing: false,
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
