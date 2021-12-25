import { ARENA_HEIGHT, ARENA_WIDTH } from './constants';

// 'A' => Arena, 'P' => Player
export const createArena = () => Array.from(Array(ARENA_HEIGHT), () => Array(ARENA_WIDTH).fill(['0', 'A']));

export const checkCollision = (arena, player, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.shape.length; y++) {
    for (let x = 0; x < player.tetromino.shape[0].length; x++) {
      if (player.tetromino.shape[y][x] === '0') continue;
      const dy = y + player.pos.y + moveY;
      const dx = x + player.pos.x + moveX;
      if (dy < 0 || dy >= ARENA_HEIGHT) return true;
      if (dx < 0 || dx >= ARENA_WIDTH) return true;
      const [cell, state] = arena[dy][dx];
      if (state === 'A' && cell !== '0') return true;
    }
  }
  return false;
};

export const rotateMatrix = (matrix, dir) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < y; x++) {
      [matrix[y][x], matrix[x][y]] = [matrix[x][y], matrix[y][x]];
    }
  }

  if (dir === 1) {
    matrix.forEach((row) => row.reverse());
  } else {
    matrix.reverse();
  }

  return matrix;
};

export const rotateItem = ({ y, x }, size, dir) => {
  return dir === -1 ? { y: size - 1 - x, x: y } : { y: x, x: size - 1 - y };
};

export const removeOneRow = (setArena, player) => {
  setArena((prevArena) => {
    const filterPlayer = (cell) => (cell[1] === 'A' ? cell : ['0', 'A']);
    const newArena = prevArena.map((row) => row.map(filterPlayer));
    const newEmptyRows = Array.from({ length: 1 }, () => Array.from({ length: ARENA_WIDTH }, () => ['0', 'A']));
    newArena.pop();

    const { y: pY, x: pX } = player.pos;
    player.tetromino.shape.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (cell === '0') return;
        newArena[y + pY][x + pX] = [cell, 'P'];
      }),
    );

    return [...newEmptyRows, ...newArena];
  });
};
