import React, { useCallback, useEffect, useReducer, useRef, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import StatusContext from '@contexts/status';
import OpponentStatusContext from '@contexts/opponentStatus';

import useSocket from '@hooks/useSocket';
import useModal from '@hooks/useModal';

import LoadingIndicator from '@components/LoadingIndicator';
import Tetris from '@components/Tetris';
import ItemSendPortal from '@components/toast/ItemSendPortal';
import ItemReceivePortal from '@components/toast/ItemReceivePortal';
import Opponent from '@components/Opponent';
import Invite from '@components/Invite';
import Timer from '@components/Timer';
import PauseModalContent from '@components/PauseModalContent';

import { ARENA_HEIGHT, ARENA_WIDTH } from '@utils/constants';

const GameRoom = () => {
  const { actions } = useContext(StatusContext);
  const { actions: oppActions } = useContext(OpponentStatusContext);

  const actionsRef = useRef(actions);
  const oopActionsRef = useRef(oppActions);

  const navigate = useNavigate();
  const { id: gameRoomId } = useParams();
  const { state: nickname } = useLocation();

  const socketRef = useSocket(`${process.env.SERVER_URL}`);
  const sendPortalRef = useRef();
  const receivePortalRef = useRef();

  const modalStyles = { backgroundColor: '#737373', overlayColor: 'black' };
  const [isGameOverModalOpen, openGameOverModal, hideGameOverModal, GameOverModal] = useModal({ styles: modalStyles });
  const [isPauseModalOpen, openPauseModal, hidePauseModal, PauseModal] = useModal({ styles: modalStyles });

  const [gameRoomState, dispatch] = useReducer(reducer, initialState);
  const { joined, playing, paused, isGameOver, opponentNickname, isPauser } = gameRoomState;

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
    if (!nickname) {
      alert('닉네임을 먼저 정해주세요😉');
      navigate('/');
    }
  }, [nickname, navigate]);

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
    socket.on('paused', (paused) => dispatch({ payload: { paused: !!paused, isPauser: paused === socket.id } }));
    socket.on('gameOver', (winner) => dispatch({ payload: { isGameOver: true, isWinner: nickname === winner } }));
    socket.on('opponentLeft', () => dispatch({ payload: { playing: false, isHost: true, opponentNickname: '' } }));

    socket.on('item', (item) => {
      const fromOpponent = item.sender !== socket.id;
      const aRef = actionsRef.current;

      if (fromOpponent) {
        receivePortalRef.current.addItem(item);
        switch (item.name) {
          // description 표시
          case 'faster':
            return aRef.setAccel((prevAccel) => prevAccel + 1);
          case 'bomb':
            return aRef.setExplodingPos({
              y: Math.floor(Math.random() * (ARENA_HEIGHT / 2)) + 7,
              x: Math.floor(Math.random() * (ARENA_WIDTH - 4)),
            });
          case 'catjam':
            return activateItem(aRef.setCatJamming, 9500);
          case 'rotate':
            return activateItem(aRef.setRotated, 8000);
          case 'flip':
            return activateItem(aRef.setFlipped, 8000);
          default:
        }
      }

      const oRef = oopActionsRef.current;

      if (!fromOpponent) {
        switch (item.name) {
          // description 표시 ? opponent 는 안해도 될듯
          case 'bomb':
            return activateItem(oRef.setExplodingPos, 1000);
          case 'catjam':
            return activateItem(oRef.setCatJamming, 9500);
          case 'rotate':
            return activateItem(oRef.setRotated, 8000);
          case 'flip':
            return activateItem(oRef.setFlipped, 8000);
          default:
        }
      }
    });
  }, [socketRef, gameRoomId, nickname, navigate, activateItem]);

  useEffect(() => {
    paused ? openPauseModal() : hidePauseModal();
  }, [paused, openPauseModal, hidePauseModal]);

  useEffect(() => {
    isGameOver ? openGameOverModal() : hideGameOverModal();
  }, [isGameOver, openGameOverModal, hideGameOverModal]);

  return (
    <>
      {!joined && <LoadingIndicator />}
      {joined && (
        <Wrapper>
          <Timer playing={playing} paused={paused} />
          <InnerWrapper>
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
                <Opponent
                  isReady={gameRoomState.isReady || playing}
                  socketRef={socketRef}
                  opponentNickname={opponentNickname}
                />
              </>
            )}
            {!opponentNickname && <Invite />}
          </InnerWrapper>
        </Wrapper>
      )}
      {isGameOverModalOpen && <GameOverModal>GAME OVER</GameOverModal>}
      {isPauseModalOpen && (
        <PauseModal>
          <PauseModalContent
            hideModal={hidePauseModal}
            callback={handleResume}
            pauser={isPauser ? nickname : opponentNickname}
          />
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
  isPauser: false,
  isHost: false,
  isReady: false,
  isGameOver: false,
  isWinner: false,
  opponentNickname: '',
};

const reducer = (state, action) => ({ ...state, ...action.payload });

const Wrapper = styled.div`
  //display: flex;
  //flex-direction: column;
  //overflow: hidden;
  height: 100%;
`;

const InnerWrapper = styled.div`
  height: 92%;
  display: flex;
`;
