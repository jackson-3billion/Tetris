import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';

import useArena from '@hooks/useArena';
import usePlayer from '@hooks/usePlayer';
import useAnimationFrame from '@hooks/useAnimationFrame';

import Arena from '@components/Arena';
import Display from '@components/Display';
import Button from '@components/Button';

import colors from '@utils/colors';
import { createArena, checkCollision, rotateMatrix } from '@utils/gameHelper';
import { DROP_FAST, DROP_SLOW, DROP_PAUSED, LEFTWARD, RIGHTWARD, DOWNWARD, KEYHOLD_MAX_CNT } from '@utils/constants';

const Tetris = ({ started, setStarted, paused, isHost, isOpponentReady, socketRef }) => {
  const [isReady, setIsReady] = useState(false); // guest 입장에서 필요 <-> isOpponentReady: host가 필요
  const [player, setPlayer, movePlayer, resetPlayer] = usePlayer();
  const [arena, setArena] = useArena(player, resetPlayer, setStarted);
  const keyHoldCounterRef = useRef(0);

  const drop = () => {
    if (checkCollision(arena, player, DOWNWARD)) {
      if (player.pos.y <= 1) {
        return setStarted(false);
      }
      return setPlayer((prev) => ({ ...prev, collided: true }));
    }
    movePlayer(DOWNWARD);
  };

  const [dropDelay, setDropDelay, requestIdRef] = useAnimationFrame(drop, DROP_SLOW, started);

  // 게임 시작 및 재시작
  useEffect(() => {
    if (started) {
      setArena(createArena());
      resetPlayer();
    }
  }, [started, setArena, resetPlayer]);

  useEffect(() => {
    if (started && paused) {
      // TODO: save current drop-delat in dropDelayRef
      setDropDelay(DROP_PAUSED);
    }
    if (started && !paused) {
      // TODO: restore drop-delay saved in dropDelayRef
      setDropDelay(DROP_SLOW);
    }
  }, [paused, started, setDropDelay]);

  // 사용자의 화면 변경사항을 상대에게 전송
  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.emit('arena-updated', arena);
    }
  }, [arena, socketRef]);

  // guest의 준비 상태를 host에게 전송
  useEffect(() => {
    if (!started) {
      const socket = socketRef.current;
      socket.emit('isReady', isReady);
    }
  }, [started, isReady, socketRef]);

  const handleButtonClick = useCallback(() => {
    if (!started && isHost && isOpponentReady) {
      const socket = socketRef.current;
      socket.emit('start', true);
    }
    if (!isHost) {
      setIsReady((isReady) => !isReady);
    }
  }, [started, isHost, isOpponentReady, socketRef]);

  const handlePause = useCallback(() => {
    const socket = socketRef.current;
    socket.emit('paused', !paused);
  }, [paused, socketRef]);

  const handleKeyUp = ({ key }) => {
    if (!started || paused) return;
    if (key !== 'ArrowDown') return;
    cancelAnimationFrame(requestIdRef.current);
    setDropDelay(DROP_SLOW);
  };

  const handleKeyHold = (callback, args) => {
    if (++keyHoldCounterRef.current >= KEYHOLD_MAX_CNT) {
      callback(args);
      keyHoldCounterRef.current = 0;
    }
  };

  const handleKeyDown = ({ key, repeat }) => {
    if (!started || paused) return;
    switch (key) {
      case 'ArrowLeft':
        if (checkCollision(arena, player, LEFTWARD) || player.collided) return;
        if (repeat) {
          handleKeyHold(movePlayer, LEFTWARD);
        } else {
          movePlayer(LEFTWARD);
        }
        break;
      case 'ArrowRight':
        if (checkCollision(arena, player, RIGHTWARD) || player.collided) return;
        if (repeat) {
          handleKeyHold(movePlayer, RIGHTWARD);
        } else {
          movePlayer(RIGHTWARD);
        }
        break;
      case 'ArrowDown':
        if (dropDelay === DROP_SLOW) {
          cancelAnimationFrame(requestIdRef.current);
          setDropDelay(DROP_FAST);
        }
        break;
      case 'ArrowUp':
        const rotatedTetromino = rotateMatrix(player.tetromino, -1);
        player.tetromino = rotatedTetromino;
        if (!checkCollision(arena, player, { x: 0, y: 0 })) {
          return setPlayer({ ...player });
        }
        if (!checkCollision(arena, player, { x: -1, y: 0 })) {
          return movePlayer(LEFTWARD);
        }
        if (!checkCollision(arena, player, { x: 1, y: 0 })) {
          return movePlayer(RIGHTWARD);
        }
        player.tetromino = rotateMatrix(player.tetromino, 1);
        break;
      default:
    }
  };

  const getButtonText = () => {
    if (isHost) {
      return 'start';
    }
    if (!isHost) {
      return isReady ? "I'm ready!" : 'get ready!';
    }
  };

  const getButtonColor = () => {
    if (isHost) {
      return isOpponentReady ? colors['buttonStart'] : colors['buttonDefault'];
    }
    if (!isHost) {
      return isReady ? colors['buttonReady'] : colors['buttonDefault'];
    }
  };

  return (
    <TetrisWrapper role="button" tabIndex="0" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <TetrisGame>
        <Arena arena={arena} />
        <aside>
          <Display text={started ? 'playing' : 'game over'} />
          <Button callback={handleButtonClick} text={getButtonText()} color={getButtonColor()} />
          <Button callback={handlePause} text={paused ? 'resume' : 'pause'} color={paused ? 'salmon' : 'blue'} />
        </aside>
      </TetrisGame>
    </TetrisWrapper>
  );
};

export default Tetris;

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
