import { useCallback, useState } from 'react';

import { TETROMINOS, randomTetromino } from '@utils/tetrominos';
import { PLAYER_INITIAL_POS } from '@utils/constants';

const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: PLAYER_INITIAL_POS,
    tetromino: TETROMINOS['0'],
    collided: false,
  });

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
    setPlayer({
      pos: { ...PLAYER_INITIAL_POS },
      tetromino: randomTetromino(),
      collided: false,
    });
  }, []);

  return [player, setPlayer, movePlayer, resetPlayer];
};

export default usePlayer;
