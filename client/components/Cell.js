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

export const Cell = ({ type, item, sparkling }) => {
  return (
    <CellBorder color={TETROMINOS[type].color}>
      <StyledCell type={type} color={TETROMINOS[type].color} sparkling={sparkling}>
        {item && itemMapper[item]}
      </StyledCell>
    </CellBorder>
  );
};

export default memo(Cell);

const sparkle = keyframes`
 16.67% { background-color: yellow; }
 33.33% { background-color: orange; }
 50.00% { background-color: salmon; }
 66.67% { background-color: green;  }
 83.33% { background-color: blue;   }
100.00% { background-color: indigo; }
`;

const CellBorder = styled.div`
  border: ${({ type }) => (type === '0' ? '0px solid' : '1px solid')};
  border-color: ${({ color }) => darken(0.2, color)};
`;

const StyledCell = styled.div`
  height: 100%;
  background-color: ${({ color }) => color};
  border: ${({ type }) => (type === '0' ? 'none' : '1px solid')};
  border-color: ${({ color }) => lighten(0.3, color)};

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ sparkling }) =>
    sparkling &&
    css`
      animation-name: ${sparkle};
      animation-duration: 0.5s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    `}
`;
