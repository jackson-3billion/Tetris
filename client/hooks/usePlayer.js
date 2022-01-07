import { useCallback, useState, useContext } from 'react';

import StatusContext from '@contexts/status';

import { TETROMINOS, randomTetromino } from '@utils/tetrominos';
import { PLAYER_INITIAL_POS } from '@utils/constants';
import { checkCollision, rotateMatrix, rotateItem } from '@utils/gameHelper';

const usePlayer = () => {
  const {
    state: { direction },
  } = useContext(StatusContext);

  const [player, setPlayer] = useState({
    pos: PLAYER_INITIAL_POS,
    tetromino: TETROMINOS['0'],
    next: TETROMINOS['0'],
    collided: false,
  });

  const initPlayer = useCallback(() => {
    setPlayer({
      pos: PLAYER_INITIAL_POS,
      tetromino: TETROMINOS['0'],
      next: TETROMINOS['0'],
      collided: false,
    });
  }, []);

  const movePlayer = ({ x, y }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: {
        x: (prev.pos.x += x),
        y: (prev.pos.y += y),
      },
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer((prevPlayer) => ({
      pos: { ...PLAYER_INITIAL_POS },
      tetromino: prevPlayer.next.color === 'transparent' ? randomTetromino() : prevPlayer.next,
      next: randomTetromino(),
      collided: false,
    }));
  }, []);

  const rotatePlayer = (arena) => {
    const rotatedTetromino = rotateMatrix(player.tetromino.shape, direction);
    player.tetromino.shape = rotatedTetromino;
    player.tetromino.itemPos = rotateItem(player.tetromino.itemPos, rotatedTetromino.length, direction);
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

    player.tetromino.shape = rotateMatrix(player.tetromino.shape, -direction);
    player.tetromino.itemPos = rotateItem(player.tetromino.itemPos, rotatedTetromino.length, -direction);
  };

  return [player, setPlayer, initPlayer, movePlayer, resetPlayer, rotatePlayer];
};

export default usePlayer;
