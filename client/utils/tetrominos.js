export const TETROMINOS = {
  0: {
    shape: [['0']],
    color: '#000000',
    itemPos: { y: -1, x: -1 },
  },
  I: {
    shape: [
      ['0', 'I', '0', '0'],
      ['0', 'I', '0', '0'],
      ['0', 'I', '0', '0'],
      ['0', 'I', '0', '0'],
    ],
    color: '#3498db', // blue
    itemPos: { y: 1, x: 1 },
  },
  J: {
    shape: [
      ['0', 'J', '0'],
      ['0', 'J', '0'],
      ['J', 'J', '0'],
    ],
    color: '#f1c40f', //yellow
    itemPos: { y: 1, x: 1 },
  },
  L: {
    shape: [
      ['0', 'L', '0'],
      ['0', 'L', '0'],
      ['0', 'L', 'L'],
    ],
    color: '#2ecc71', //green
    itemPos: { y: 0, x: 1 },
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '#e74c3c', // red
    itemPos: { y: 1, x: 0 },
  },
  S: {
    shape: [
      ['0', 'S', 'S'],
      ['S', 'S', '0'],
      ['0', '0', '0'],
    ],
    color: '#9b59b6', // purple
    itemPos: { y: 0, x: 2 },
  },
  Z: {
    shape: [
      ['Z', 'Z', '0'],
      ['0', 'Z', 'Z'],
      ['0', '0', '0'],
    ],
    color: '#e67e22', // orange
    itemPos: { y: 0, x: 0 },
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      ['0', 'T', '0'],
      ['0', '0', '0'],
    ],
    color: '#1abc9c', // turquoise
    itemPos: { y: 0, x: 1 },
  },
};

const ITEM_CHANCE = 0.5;
//const ITEMS = ['bomb', 'star', 'faster', 'slower'];
const ITEMS = ['bomb'];

const getRandomItem = () => {
  const hasItem = Math.random() > ITEM_CHANCE;
  return hasItem && ITEMS[Math.floor(Math.random() * ITEMS.length)];
};

export const randomTetromino = () => {
  const tetromino_types = 'LJSZOTI';
  const randomType = tetromino_types[Math.floor(Math.random() * tetromino_types.length)];
  const tetromino = { ...TETROMINOS[randomType], item: getRandomItem() };

  return tetromino;
};
