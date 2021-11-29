import React from 'react';
import styled from '@emotion/styled';
import { lighten, darken } from 'polished';

import { TETROMINOS } from '@utils/tetrominos';

export const Cell = ({ type }) => {
  return (
    <CellBorder color={TETROMINOS[type].color}>
      <StyledCell type={type} color={TETROMINOS[type].color} />
    </CellBorder>
  );
};

export default Cell;

const CellBorder = styled.div`
  border: ${({ type }) => (type === '0' ? '0px solid' : '1px solid')};
  border-color: ${({ color }) => darken(0.2, color)};
`;

const StyledCell = styled.div`
  //width: auto;
  height: 100%;
  background-color: ${({ color }) => color};
  border: ${({ type }) => (type === '0' ? 'none' : '1px solid')};
  border-color: ${({ color }) => lighten(0.3, color)};
`;
