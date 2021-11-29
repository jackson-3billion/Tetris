import { ARENA_HEIGHT, ARENA_WIDTH } from './constants';

// 'A' => Arena, 'P' => Player
export const createArena = () => Array.from(Array(ARENA_HEIGHT), () => Array(ARENA_WIDTH).fill(['0', 'A']));

export const checkCollision = (arena, player, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[0].length; x++) {
      if (player.tetromino[y][x] === '0') continue;
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
