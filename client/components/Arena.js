import React from 'react';
import styled from '@emotion/styled';

import Cell from './Cell';

const Arena = ({ arena }) => {
  return (
    <StyledArena width={arena[0].length} height={arena.length}>
      {arena.map((row) => row.map(([type], idx) => <Cell key={idx} type={type} />))}
    </StyledArena>
  );
};

export default Arena;

const StyledArena = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${({ height }) => height},
    calc((25vw - (${({ width }) => width - 1 + 'px'})) / ${({ width }) => width})
  );
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-gap: 1px;
  //border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;
