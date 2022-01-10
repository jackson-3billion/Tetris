import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowDownCircleFill,
  BsFillArrowRightCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';

import StatusContext from '@contexts/status';

import useArena from '@hooks/useArena';
import usePlayer from '@hooks/usePlayer';
import useAnimationFrame from '@hooks/useAnimationFrame';

import Arena from '@components/Arena';
import Preview from '@components/Preview';
import Display from '@components/Display';
import Button from '@components/Button';
import CatJamGif from '@components/CatJam';

import colors from '@utils/colors';
import { createArena, checkCollision, removeOneRow } from '@utils/gameHelper';
import {
  DROP_FAST,
  DROP_SLOW,
  DROP_PAUSED,
  MIN_INTERVAL,
  LEFTWARD,
  RIGHTWARD,
  DOWNWARD,
  KEYHOLD_MAX_CNT,
} from '@utils/constants';

const Tetris = ({ gameRoomState, setPlaying, setRank, socketRef, sendPortalRef }) => {
  const { state: nickname } = useLocation();
  const { playing, paused, isHost, isOpponentReady, opponentNickname } = gameRoomState;

  // context
  const {
    state,
    actions: { setAccel },
  } = useContext(StatusContext);
  const { level, items, accel, score, explodingPos, catJamming } = state;

  // outlet context
  const [toggleSettingModal] = useOutletContext();

  // local-state
  const [isReady, setIsReady] = useState(false); // guest 입장에서 필요 <-> isOpponentReady: host가 필요
  const [finished, setFinished] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [pressedSpacebar, setPressedSpacebar] = useState(false);
  const [controllable, setControllable] = useState(true);

  // custom hooks
  const [player, setPlayer, initPlayer, movePlayer, resetPlayer, rotatePlayer] = usePlayer();
  const [arena, setArena] = useArena(player, resetPlayer);

  // ref
  const focusRef = useRef();
  const newIntervalRef = useRef(DROP_SLOW);
  const keyHoldCounterRef = useRef(0);
  const catJamBgmRef = useRef(new Audio('../bgms/cat-jam.mp3'));
  const arrowLeftRef = useRef();

  const drop = useCallback(() => {
    if (!playing) return;
    if (checkCollision(arena, player, DOWNWARD)) {
      if (player.pos.y <= 1) {
        socketRef.current.emit('gameover', score);
        setPlaying(false);
        setFinished(true);
        setIsReady(false);
        return;
      }
      return setPlayer((prev) => ({ ...prev, collided: true }));
    }
    movePlayer(DOWNWARD);
  }, [arena, movePlayer, player, setPlayer, playing, setPlaying, score, socketRef]);

  const [dropInterval, setDropInterval, cancelAnimation] = useAnimationFrame(drop, DROP_SLOW, playing);

  useEffect(() => focusRef.current.focus());

  useEffect(() => {
    if (finished) {
      setFinished(false);
      setWaiting(true);
      axios
        .post('/players', { nickname, score })
        .then((res) => setRank(res.data.ranking))
        .catch((err) => console.log(err.response.data.msg));
    }
  }, [finished, nickname, score, setRank]);

  useEffect(() => {
    if (!opponentNickname) {
      setIsReady(false);
    }
    initPlayer();
    setArena(createArena());
  }, [opponentNickname, setArena, initPlayer]);

  // hook으로 빼낼 수 있을 듯
  useEffect(() => {
    let newInterval = DROP_SLOW - (level - 1) * 50;
    if (accel < 0) {
      newInterval -= accel * 50;
    }
    if (accel > 0) {
      const q = Math.floor((newInterval - MIN_INTERVAL) / 50);
      newInterval -= Math.min(q, accel) * 50;
    }
    if (newInterval >= MIN_INTERVAL) {
      setDropInterval(newInterval);
      // setDropInterval((prevInterval) => {
      //   if (prevInterval === DROP_FAST) {
      //     // 아래방향키 누르고 있는 중일때는 dropInterval 바꾸지 않는다.
      //     newIntervalRef.current = newInterval;
      //     return prevInterval;
      //   }
      //   return newInterval;
      // });
    }
  }, [level, accel, setDropInterval]);

  //  hook 으로 분리해보자
  useEffect(() => {
    if (explodingPos) {
      return setControllable(false);
    }
    if (!explodingPos) {
      setArena((prevArena) =>
        prevArena.map((row) => row.map((cell) => (cell[2]?.name === 'fire' ? ['0', 'A'] : cell))),
      );
      return setControllable(true);
    }
  }, [explodingPos, setArena]);

  // 게임 시작 및 재시작
  useEffect(() => {
    if (playing) {
      setArena(createArena());
      resetPlayer();
    }
  }, [playing, setArena, resetPlayer]);

  useEffect(() => {
    if (!playing) return;
    if (paused) {
      // cancelAnimation();
      setDropInterval((prevInterval) => {
        newIntervalRef.current = prevInterval;
        // if (prevInterval !== DROP_FAST) {
        //   newIntervalRef.current = prevInterval;
        // }
        return DROP_PAUSED;
      });
    }
    if (!paused) {
      setDropInterval(newIntervalRef.current);
    }
  }, [paused, playing, setDropInterval]);

  // 사용자의 화면 변경사항을 상대에게 전송
  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.emit('arena-updated', arena);
    }
  }, [arena, socketRef]);

  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.emit('score-updated', score);
    }
  }, [score, socketRef]);

  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.emit('level-updated', level);
    }
  }, [level, socketRef]);

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
    if (!player?.next || !socketRef?.current) {
      return;
    }
    const socket = socketRef.current;
    socket.emit('preview-updated', player.next.preview);
  }, [player.next, socketRef]);

  // TODO: 모바일 버튼 구현(진행중)
  // useEffect(() => {
  //   arrowLeftRef.current.dispatchEvent(
  //     new KeyboardEvent('keydown', {
  //       key: 'ArrowLeft',
  //     }),
  //   );
  // }, []);

  useEffect(() => {
    const socket = socketRef.current;
    let attackItemCnt = 0;

    while (items.length) {
      const item = items.pop();
      switch (item.name) {
        case 'star': // 자신에게 적용되는 아이템
          setControllable(false);
          setArena((prevArena) => {
            const newArena = prevArena.map((row) => row);
            for (let i = 0; i < prevArena[0].length; i++) {
              const cell = newArena[prevArena.length - 1][i];
              if (cell[0] !== '0') {
                cell[2] = cell[2] ? { ...cell[2], sparkling: true } : { sparkling: true };
              }
            }
            return newArena;
          });
          return setTimeout(() => {
            removeOneRow(setArena, player);
            setControllable(true);
          }, 500);
        case 'slower': // 자신에게 적용되는 아이템
          return setAccel((accel) => accel - 1);
        case 'bomb': // 상대에게 적용되는 아이템
        case 'faster':
        case 'catjam':
        case 'rotate':
        case 'flip':
          return setTimeout(() => {
            sendPortalRef.current.addItem(item);
            socket.emit('item', item);
          }, attackItemCnt++ * 500);
        default:
          return;
      }
    }
  }, [items, setArena, player, setAccel, socketRef, sendPortalRef]);

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

  const handleUpperButtonClick = useCallback(() => {
    if (!playing && isHost && isOpponentReady) {
      const socket = socketRef.current;
      socket.emit('start', true);
    }
    if (!isHost) {
      setIsReady((isReady) => !isReady);
    }
  }, [playing, isHost, isOpponentReady, socketRef]);

  const handleLowerButtonClick = useCallback(() => {
    const socket = socketRef.current;
    if (paused) {
      socket.emit('resume');
    } else {
      socket.emit('paused');
    }
  }, [paused, socketRef]);

  // const handleKeyUp = useCallback(
  //   ({ key }) => {
  //     if (key !== 'ArrowDown') return;
  //     if (!playing || paused) return;
  //     cancelAnimation();
  //     setDropInterval(newIntervalRef.current);
  //   },
  //   [playing, paused, cancelAnimation, setDropInterval],
  // );

  const handleKeyHold = useCallback((callback, args) => {
    if (++keyHoldCounterRef.current >= KEYHOLD_MAX_CNT) {
      callback(args);
      keyHoldCounterRef.current = 0;
    }
  }, []);

  const handleKeyDown = ({ key, repeat }) => {
    if (!controllable) return;
    if (key !== 'S' && key !== 's' && (!playing || paused)) return;
    switch (key) {
      case 'ArrowLeft':
        if (checkCollision(arena, player, LEFTWARD) || player.collided) return;
        //if (dropInterval === DROP_FAST) setDropInterval(newIntervalRef.current);
        return repeat ? handleKeyHold(movePlayer, LEFTWARD) : movePlayer(LEFTWARD);
      case 'ArrowRight':
        if (checkCollision(arena, player, RIGHTWARD) || player.collided) return;
        //if (dropInterval === DROP_FAST) setDropInterval(newIntervalRef.current);
        return repeat ? handleKeyHold(movePlayer, RIGHTWARD) : movePlayer(RIGHTWARD);
      case 'ArrowDown':
        return repeat ? handleKeyHold(drop) : drop();
      // if (dropInterval !== DROP_FAST) {
      //   setDropInterval((prevInterval) => {
      //     if (prevInterval !== DROP_FAST) {
      //       newIntervalRef.current = prevInterval;
      //     }
      //     return DROP_FAST;
      //   });
      // }
      // return;
      case 'ArrowUp':
        return rotatePlayer(arena);
      case 'Spacebar':
      case ' ':
        return dropToBottom();
      case 'P':
      case 'p':
        return handleLowerButtonClick();
      case 'S':
      case 's':
        return toggleSettingModal((isModalOpen) => !isModalOpen);
      default:
    }
  };

  const getButtonColor = () => {
    if (isHost) {
      return isOpponentReady ? colors['startable'] : colors['default'];
    }
    if (!isHost) {
      return isReady ? colors['isReady'] : colors['isNotReady'];
    }
  };

  return (
    <TetrisWrapper ref={focusRef} role="button" tabIndex="0" onKeyDown={handleKeyDown}>
      <TetrisGame>
        <Arena arena={arena} {...state} isReady={isReady || (isOpponentReady && playing)} />
        <aside>
          <Display title="next">
            <Preview tetromino={player.next.preview} />
          </Display>
          <Display title="Nickname">{nickname}</Display>
          <Display title="Level">{level}</Display>
          <Display title="Score">{score}</Display>
          {!playing && !finished && !waiting && (
            <UpperButton
              callback={handleUpperButtonClick}
              backgroundColor={getButtonColor()}
              disabled={isHost && !isOpponentReady}
            >
              {isHost ? 'START' : isReady ? "I'm Ready!'" : 'Get Ready'}
            </UpperButton>
          )}
          {playing && !finished && (
            <LowerButton callback={handleLowerButtonClick} backgroundColor="#5e534f">
              PAUSE
            </LowerButton>
          )}
        </aside>
        <MobileButtons>
          <span ref={arrowLeftRef}>
            <BsFillArrowLeftCircleFill size="50px" color="#B0A8B9" />
          </span>
          <span>
            <BsFillArrowDownCircleFill size="50px" color="#B0A8B9" />
          </span>
          <span>
            <BsFillArrowRightCircleFill size="50px" color="#B0A8B9" />
          </span>
          <span>
            <BsFillArrowUpCircleFill size="50px" color="#B0A8B9" />
          </span>
          <span>
            <span>Drop</span>
          </span>
        </MobileButtons>
      </TetrisGame>
      {catJamming && <CatJamGif catJamBgmRef={catJamBgmRef} isOpponent={false} />}
    </TetrisWrapper>
  );
};

export default Tetris;

const TetrisWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
  &:focus {
    outline: none;
  }

  @media all and (max-width: 500px) {
    width: 100%;
  }
`;

const TetrisGame = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    width: 140px;
    display: block;
    padding: 0 20px;

    & > Button {
      border-radius: 5px;
      padding: 0.5rem 0;
      &:hover {
        background-color: ${({ backgroundColor }) => backgroundColor && lighten(0.1, backgroundColor)};
      }
    }
    @media all and (max-width: 500px) {
      width: 100px;
      margin-left: auto;
    }
  }
  @media all and (max-width: 500px) {
    width: 100%;
  }
`;

const UpperButton = styled(Button)`
  &:hover {
    background-color: ${({ backgroundColor }) => backgroundColor && lighten(0.1, backgroundColor)};
  }
`;

const LowerButton = styled(Button)`
  &:hover {
    background-color: ${({ backgroundColor }) => backgroundColor && lighten(0.1, backgroundColor)};
  }
`;

const MobileButtons = styled.div`
  @media all and (min-width: 501px) {
    display: none;
  }
  & > span {
    position: absolute;
    border: 2px solid white;
    border-radius: 300px;
    width: 54px;
    height: 62px;

    &:nth-of-type(1) {
      left: 2rem;
      bottom: 4rem;
    }
    &:nth-of-type(2) {
      left: 5rem;
      bottom: 2rem;
    }
    &:nth-of-type(3) {
      left: 8rem;
      bottom: 4rem;
    }
    &:nth-of-type(4) {
      left: 5rem;
      bottom: 6rem;
    }
    &:nth-of-type(5) {
      right: 5rem;
      bottom: 4rem;
      width: 54px;
      height: 62px;

      & > span {
        background-color: #b0a8b9;
        border-radius: 300px;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }
    }
  }
`;
