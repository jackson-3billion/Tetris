import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import styled from '@emotion/styled';

import StatusContext from '@contexts/status';

import useArena from '@hooks/useArena';
import usePlayer from '@hooks/usePlayer';
import useAnimationFrame from '@hooks/useAnimationFrame';

import Arena from '@components/Arena';
import Display from '@components/Display';
import Button from '@components/Button';

import colors from '@utils/colors';
import { createArena, checkCollision, removeOneRow } from '@utils/gameHelper';
import { DROP_FAST, DROP_SLOW, DROP_PAUSED, LEFTWARD, RIGHTWARD, DOWNWARD, KEYHOLD_MAX_CNT } from '@utils/constants';

const Tetris = ({ gameRoomState, setPlaying, socketRef, sendPortalRef }) => {
  const { playing, paused, isHost, isReady: isOpponentReady } = gameRoomState;

  // context
  const { state, actions } = useContext(StatusContext);
  const { level, speed, items } = state;
  const { setSpeed } = actions;

  // local-state
  const [isReady, setIsReady] = useState(false); // guest 입장에서 필요 <-> isOpponentReady: host가 필요
  const [pressedSpacebar, setPressedSpacebar] = useState(false);

  // custom hooks
  const [player, setPlayer, movePlayer, resetPlayer, rotatePlayer] = usePlayer();
  const [arena, setArena] = useArena(player, resetPlayer, setPlaying);
  const [dropInterval, setDropInterval, cancelAnimation] = useAnimationFrame(() => drop(), DROP_SLOW, playing);

  // ref
  const focusRef = useRef();
  const keyHoldCounterRef = useRef(0);

  const drop = useCallback(() => {
    if (checkCollision(arena, player, DOWNWARD)) {
      if (player.pos.y <= 1) {
        return setPlaying(false);
      }
      return setPlayer((prev) => ({ ...prev, collided: true }));
    }
    movePlayer(DOWNWARD);
  }, [arena, movePlayer, player, setPlayer, setPlaying]);

  useEffect(() => focusRef.current.focus());

  useEffect(() => {
    setSpeed(1000 - (level - 1) * 50);
  }, [level, setSpeed]);

  // 게임 시작 및 재시작
  useEffect(() => {
    if (playing) {
      setArena(createArena());
      // resetDropInterval
      resetPlayer();
    }
  }, [playing, setArena, resetPlayer]);

  useEffect(() => {
    if (!playing) return;
    if (paused) {
      // TODO: save current drop-delay in dropIntervalRef
      setDropInterval(DROP_PAUSED);
    }
    if (!paused) {
      // TODO: restore drop-delay saved in dropIntervalRef
      setDropInterval(DROP_SLOW);
    }
  }, [paused, playing, setDropInterval]);

  // 사용자의 화면 변경사항을 상대에게 전송
  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.emit('arena-updated', arena);
    }
  }, [arena, socketRef]);

  // guest의 준비 상태를 host에게 전송
  useEffect(() => {
    if (!playing) {
      const socket = socketRef.current;
      socket.emit('isReady', isReady);
    }
  }, [playing, isReady, socketRef]);

  useEffect(() => {
    if (pressedSpacebar) {
      setPressedSpacebar(false);
      drop();
    }
  }, [pressedSpacebar, drop]);

  useEffect(() => {
    const socket = socketRef.current;
    let attackItemCnt = 0;

    while (items.length) {
      const item = items.pop();
      switch (item.name) {
        case 'star': // 자신에게 적용되는 아이템
          actions.setSparkling(true);
          setTimeout(() => {
            actions.setSparkling(false);
            removeOneRow(setArena, player);
          }, 500);
          break;
        case 'slower': // 자신에게 적용되는 아이템
          break;
        case 'bomb': // 상대에게 적용되는 아이템
        case 'faster': // 상대에게 적용되는 아이템
          setTimeout(() => {
            sendPortalRef.current.addItem(item);
            socket.emit('item', item);
          }, attackItemCnt * 500);
          ++attackItemCnt;
          break;
        default:
          return;
      }
    }
  }, [items, setArena, player, actions, socketRef, sendPortalRef]);

  const dropToBottom = () => {
    let cnt = 1;
    while (!checkCollision(arena, player, { x: 0, y: cnt })) {
      ++cnt;
    }
    setPlayer((prev) => ({
      ...prev,
      collided: true,
      pos: {
        x: prev.pos.x,
        y: (prev.pos.y += cnt - 1),
      },
    }));
    setPressedSpacebar(true);
  };

  const handleButtonClick = useCallback(() => {
    if (!playing && isHost && isOpponentReady) {
      const socket = socketRef.current;
      socket.emit('start', true);
    }
    if (!isHost) {
      setIsReady((isReady) => !isReady);
    }
  }, [playing, isHost, isOpponentReady, socketRef]);

  const handlePause = useCallback(() => {
    const socket = socketRef.current;
    socket.emit('paused', !paused);
  }, [paused, socketRef]);

  const handleKeyUp = useCallback(
    ({ key }) => {
      if (key !== 'ArrowDown') return;
      if (!playing || paused) return;
      cancelAnimation();
      setDropInterval(DROP_SLOW);
    },
    [playing, paused, cancelAnimation, setDropInterval],
  );

  const handleKeyHold = useCallback((callback, args) => {
    if (++keyHoldCounterRef.current >= KEYHOLD_MAX_CNT) {
      callback(args);
      keyHoldCounterRef.current = 0;
    }
  }, []);

  const handleKeyDown = ({ key, repeat }) => {
    if (!playing || paused) return;
    switch (key) {
      case 'ArrowLeft':
        if (checkCollision(arena, player, LEFTWARD) || player.collided) return;
        return repeat ? handleKeyHold(movePlayer, LEFTWARD) : movePlayer(LEFTWARD);
      case 'ArrowRight':
        if (checkCollision(arena, player, RIGHTWARD) || player.collided) return;
        return repeat ? handleKeyHold(movePlayer, RIGHTWARD) : movePlayer(RIGHTWARD);
      case 'ArrowDown':
        return dropInterval === DROP_SLOW && setDropInterval(DROP_FAST);
      case 'ArrowUp':
        return rotatePlayer(arena);
      case 'Spacebar':
      case ' ':
        return dropToBottom();
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
    <TetrisWrapper ref={focusRef} role="button" tabIndex="0" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <TetrisGame>
        <Arena arena={arena} />
        <aside>
          <Display text={level} />
          <Display text={speed} />
          <Display text={playing ? 'playing' : 'game over'} />
          <Button callback={handleButtonClick} text={getButtonText()} color={getButtonColor()} />
          {playing && (
            <Button callback={handlePause} text={paused ? 'resume' : 'pause'} color={paused ? 'salmon' : 'blue'} />
          )}
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
