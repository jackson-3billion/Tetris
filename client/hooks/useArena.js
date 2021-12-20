import { useState, useEffect, useContext } from 'react';

import ItemsContext from '@contexts/items';

import { createArena, checkCollision } from '@utils/gameHelper';
import { ARENA_HEIGHT, ARENA_WIDTH } from '@utils/constants';

const useArena = (player, resetPlayer, setPlaying) => {
  const [arena, setArena] = useState(createArena());
  const { actions } = useContext(ItemsContext);

  useEffect(() => {
    setArena((prevArena) => {
      if (checkCollision(prevArena, player, { x: 0, y: 0 })) {
        console.log('useArena - useEffect - checkCollision');
        setTimeout(() => {
          setPlaying(false); // game over
          resetPlayer();
        }, 0);
        return prevArena;
      }
      const filterPlayer = (cell) => (cell[1] === 'A' ? cell : ['0', 'A']);
      const newArena = prevArena.map((row) => row.map(filterPlayer));
      const { y: pY, x: pX } = player.pos;
      const { y: itemY, x: itemX } = player.tetromino.itemPos;

      player.tetromino.shape.forEach((row, y) =>
        row.forEach((cell, x) => {
          if (cell === '0') return;
          newArena[y + pY][x + pX] = player.collided ? [cell, 'A'] : [cell, 'P'];
          if (player.tetromino.item && y === itemY && x === itemX) {
            newArena[y + pY][x + pX].push(player.tetromino.item);
          }
        }),
      );

      const items = new Set();
      const rowsToSweep = [];
      outer: for (let y = ARENA_HEIGHT - 1; y >= 0; y--) {
        for (let x = 0; x < ARENA_WIDTH; x++) {
          if (newArena[y][x][0] === '0') continue outer;
          if (newArena[y][x][1] === 'P') continue outer;
        }
        rowsToSweep.push(y);
      }
      rowsToSweep.forEach((line) => {
        newArena[line].forEach(([, , item]) => item && items.add(item));
        newArena.splice(line, 1);
      });

      items.size && setTimeout(() => actions.setItems([...items]), 0);
      const newEmptyRows = Array.from(Array(rowsToSweep.length), () => new Array(ARENA_WIDTH).fill(['0', 'A']));

      if (player.collided) {
        resetPlayer();
      }

      return [...newEmptyRows, ...newArena];
    });
  }, [player, resetPlayer, setPlaying, actions]);

  return [arena, setArena];
};

export default useArena;
