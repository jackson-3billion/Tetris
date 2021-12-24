import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import styled from '@emotion/styled';
//import { MdDoubleArrow } from 'react-icons/md';

import ItemsContext from '@contexts/items';

import useArena from '@hooks/useArena';
import usePlayer from '@hooks/usePlayer';
import useAnimationFrame from '@hooks/useAnimationFrame';

import Arena from '@components/Arena';
import Display from '@components/Display';
import Button from '@components/Button';

import colors from '@utils/colors';
import { createArena, checkCollision, rotateMatrix, rotateItem, removeOneRow } from '@utils/gameHelper';
import { DROP_FAST, DROP_SLOW, DROP_PAUSED, LEFTWARD, RIGHTWARD, DOWNWARD, KEYHOLD_MAX_CNT } from '@utils/constants';

const Tetris = ({ started, setStarted, paused, isHost, isOpponentReady, socketRef, sendPortalRef }) => {
  const [level, setLevel] = useState(1); // level => dropInterval 설정
  const { state, actions } = useContext(ItemsContext);
  const [isReady, setIsReady] = useState(false); // guest 입장에서 필요 <-> isOpponentReady: host가 필요
  const [pressedSpacebar, setPressedSpacebar] = useState(false);
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

  const [dropInterval, setDropInterval, cancelAnimation] = useAnimationFrame(drop, DROP_SLOW, started);

  // 게임 시작 및 재시작
  useEffect(() => {
    if (started) {
      setArena(createArena());
      // resetDropInterval
      resetPlayer();
    }
  }, [started, setArena, resetPlayer]);

  useEffect(() => {
    if (!started) return;
    if (paused) {
      // TODO: save current drop-delay in dropIntervalRef
      setDropInterval(DROP_PAUSED);
    }
    if (!paused) {
      // TODO: restore drop-delay saved in dropIntervalRef
      setDropInterval(DROP_SLOW);
    }
  }, [paused, started, setDropInterval]);

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

  useEffect(() => {
    if (pressedSpacebar) {
      setPressedSpacebar(false);
      drop();
    }
  }, [pressedSpacebar, drop]);

  useEffect(() => {
    const socket = socketRef.current;
    let attackItemCnt = 0;

    while (state.items.length) {
      const item = state.items.pop();
      switch (item.name) {
        case 'star': // 자신에게 적용되는 아이템
          actions.setSparkling(true);
          setTimeout(() => {
            actions.setSparkling(false);
            removeOneRow(setArena, player)();
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
  }, [state.items, setArena, player, actions, socketRef, sendPortalRef]);

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
    if (key !== 'ArrowDown') return;
    if (!started || paused) return;
    cancelAnimation();
    setDropInterval(DROP_SLOW);
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
        if (dropInterval === DROP_SLOW) {
          setDropInterval(DROP_FAST);
        }
        break;
      case 'ArrowUp':
        const rotatedTetromino = rotateMatrix(player.tetromino.shape, -1);
        player.tetromino.shape = rotatedTetromino;
        player.tetromino.itemPos = rotateItem(player.tetromino.itemPos, rotatedTetromino.length, -1);
        if (!checkCollision(arena, player, { x: 0, y: 0 })) {
          return setPlayer({ ...player });
        }
        for (let i = 1; i <= 2; i++) {
          if (!checkCollision(arena, player, { x: -1 * i, y: 0 })) {
            return movePlayer({ x: -1 * i, y: 0 });
          }

          if (!checkCollision(arena, player, { x: 1 * i, y: 0 })) {
            return movePlayer({ x: 1 * i, y: 0 });
          }
        }

        player.tetromino.shape = rotateMatrix(player.tetromino.shape, 1);
        player.tetromino.itemPos = rotateItem(player.tetromino.itemPos, rotatedTetromino.length, 1);
        break;
      case 'Spacebar':
      case ' ':
        dropToBottom();
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
          {started && (
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
