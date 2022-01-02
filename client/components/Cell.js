import React, { memo } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { lighten } from 'polished';

import { TETROMINOS } from '@utils/tetrominos';
import { iconMapper } from '@utils/items';

export const Cell = ({ type, item, sparkling, exploding }) => {
  return (
    <CellBorder type={type} color={TETROMINOS[type].color}>
      <StyledCell type={type} color={TETROMINOS[type].color} sparkling={sparkling} exploding={exploding}>
        {item && iconMapper[item.name]}
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

const explode = keyframes`
0% { fill: yellow }
50% { fill: '#f05d14'; }
100% { fill: '#fb1239'; }
`;

const CellBorder = styled.div`
  border: 1px solid #303030;
  margin-left: -1px;
  margin-top: -1px;
`;

const StyledCell = styled.div`
  height: 100%;
  background-color: ${({ color }) => color};
  border: ${({ type }) => (type === '0' ? 'none' : '2px solid')};
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

  & > svg path {
    ${({ exploding }) =>
      exploding &&
      css`
        animation: ${explode} 0.2s ease-in-out infinite alternate;
      `}
  }
`;
