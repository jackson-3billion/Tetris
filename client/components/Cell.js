import React, { memo } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { lighten, darken } from 'polished';

import { TETROMINOS } from '@utils/tetrominos';

import { FaForward, FaBackward, FaStar, FaBomb } from 'react-icons/fa';

const itemMapper = {
  bomb: <FaBomb color="black" size="90%" />,
  star: <FaStar color="yellow" size="90%" />,
  faster: <FaForward color="green" size="90%" />,
  slower: <FaBackward color="crimson" size="90%" />,
};

export const Cell = ({ type, item, exploding }) => {
  return (
    <CellBorder color={TETROMINOS[type].color}>
      <StyledCell type={type} color={TETROMINOS[type].color} exploding={exploding}>
        {item && itemMapper[item]}
      </StyledCell>
    </CellBorder>
  );
};

export default memo(Cell);

const sparkling = keyframes`
 0.00% { background-color: red;    }
 16.67% { background-color: orange; }
 33.33% { background-color: yellow; }
 50.00% { background-color: green;  }
 66.67% { background-color: blue;   }
 83.33% { background-color: indigo; }
100.00% { background-color: violet; }
`;

const CellBorder = styled.div`
  border: ${({ type }) => (type === '0' ? '0px solid' : '1px solid')};
  border-color: ${({ color }) => darken(0.2, color)};
`;

const StyledCell = styled.div`
  height: 100%;
  background-color: ${({ color, exploding }) => (exploding ? 'red' : color)};
  border: ${({ type }) => (type === '0' ? 'none' : '1px solid')};
  border-color: ${({ color }) => lighten(0.3, color)};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ exploding }) =>
    exploding &&
    css`
      animation-name: ${sparkling};
      animation-duration: 0.5s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    `}
`;
