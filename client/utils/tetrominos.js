export const TETROMINOS = {
  0: {
    shape: [['0']],
    color: '#000000',
  },
  I: {
    shape: [
      ['0', 'I', '0', '0'],
      ['0', 'I', '0', '0'],
      ['0', 'I', '0', '0'],
      ['0', 'I', '0', '0'],
    ],
    color: '#3498db', // blue
  },
  J: {
    shape: [
      ['0', 'J', '0'],
      ['0', 'J', '0'],
      ['J', 'J', '0'],
    ],
    color: '#f1c40f', //yellow
  },
  L: {
    shape: [
      ['0', 'L', '0'],
      ['0', 'L', '0'],
      ['0', 'L', 'L'],
    ],
    color: '#2ecc71', //green
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '#e74c3c', // red
  },
  S: {
    shape: [
      ['0', 'S', 'S'],
      ['S', 'S', '0'],
      ['0', '0', '0'],
    ],
    color: '#9b59b6', // purple
  },
  Z: {
    shape: [
      ['Z', 'Z', '0'],
      ['0', 'Z', 'Z'],
      ['0', '0', '0'],
    ],
    color: '#e67e22', // orange
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      ['0', 'T', '0'],
      ['0', '0', '0'],
    ],
    color: '#1abc9c', // turquoise
  },
};

export const randomTetromino = () => {
  const tetromino_types = 'LJSZOTI';
  const randomType = tetromino_types[Math.floor(Math.random() * tetromino_types.length)];
  return TETROMINOS[randomType];
};
