import React from 'react';
import { FaForward, FaBackward, FaStar, FaBomb, FaFireAlt } from 'react-icons/fa';
import { IoLogoOctocat } from 'react-icons/io';
import { GrRotateLeft } from 'react-icons/gr';
import { MdFlip } from 'react-icons/md';

const ITEM_CHANCE = 0.2;
const ITEMS = [
  {
    name: 'bomb',
    description: '라인이 한 줄 추가됩니다.',
  },
  {
    name: 'star',
    description: '라인이 한 줄 삭제됩니다.',
  },
  {
    name: 'faster',
    description: '낙하 속도가 가속됩니다.',
  },
  {
    name: 'slower',
    description: '낙하 속도가 감속됩니다.',
  },
  {
    name: 'catjam',
    description: '고양이가 출몰합니다.',
  },
  {
    name: 'rotate',
    description: '화면이 180도 회전합니다.',
  },
  {
    name: 'flip',
    description: '화면의 좌우가 반전됩니다.',
  },
];

export const getRandomItem = () => {
  if (Math.floor(Math.random() * 10) > ITEM_CHANCE) {
    return ITEMS[Math.floor(Math.random() * ITEMS.length)];
  }
};

export const iconMapper = {
  bomb: <FaBomb color="black" size="80%" />,
  bombOnFire: <FaBomb color="red" size="80%" />,
  fire: <FaFireAlt color="red" size="80%" />,
  star: <FaStar color="yellow" size="80%" />,
  faster: <FaForward color="#4B4453" size="80%" />,
  slower: <FaBackward color="#008800" size="80%" />,
  catjam: <IoLogoOctocat color="white" size="80%" />,
  rotate: <GrRotateLeft color="white" size="80%" />,
  flip: <MdFlip color="white" size="80%" />,
};
