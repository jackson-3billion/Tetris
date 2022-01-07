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
import GameOverModalContent from '@components/GameOverModalContent';
import PauseModalContent from '@components/PauseModalContent';

import { ARENA_HEIGHT, ARENA_WIDTH } from '@utils/constants';

const GameRoom = () => {
  const { state, actions } = useContext(StatusContext);
  const {
    state: { finalScore: opponentFinalScore },
    actions: oppActions,
  } = useContext(OpponentStatusContext);

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
  const { joined, playing, paused, isGameOver, opponentNickname, isPauser, rank } = gameRoomState;

  const handleStateChange = useCallback((k) => (v) => dispatch({ payload: { [k]: v } }), []);
  const handleResume = useCallback(() => socketRef?.current?.emit('resume'), [socketRef]);
  const handleReplayClick = useCallback(() => socketRef.current?.emit('replay'), [socketRef]);
  const reset = () =>
    dispatch({
      payload: {
        playing: false,
        paused: false,
        isPauser: false,
        isHost: true,
        isReady: false,
        isGameOver: false,
        opponentNickname: '',
        rank: null,
      },
    });

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
    socket.on('opponentFinished', (score) => oopActionsRef.current.setFinalScore(score));
    socket.on('replay', () => window.location.reload());
    socket.on('opponentLeft', reset);

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

  useEffect(() => {
    if (!playing && opponentFinalScore !== -1) {
      dispatch({ payload: { playing: false, isGameOver: true } });
    }
  }, [playing, opponentFinalScore, nickname, state.score]);

  useEffect(() => {
    if (opponentNickname) {
      actionsRef.current.resetStatus();
      oopActionsRef.current.resetOpponentStatus();
    }
  }, [opponentNickname]);

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
              setRank={handleStateChange('rank')}
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
            {!opponentNickname && <Invite gameRoomId={gameRoomId} nickname={nickname} />}
          </InnerWrapper>
        </Wrapper>
      )}
      {isGameOverModalOpen && (
        <GameOverModal>
          <GameOverModalContent rank={rank} callback={handleReplayClick} />
        </GameOverModal>
      )}
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

const reducer = (state, action) => ({ ...state, ...action.payload });
const initialState = {
  joined: false,
  playing: false,
  paused: false,
  isPauser: false,
  isHost: false,
  isReady: false,
  isGameOver: false,
  opponentNickname: '',
  rank: null,
};

const Wrapper = styled.div`
  height: 100%;
`;

const InnerWrapper = styled.div`
  height: 92%;
  display: flex;
`;
