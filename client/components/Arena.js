import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import StatusContext from '@contexts/status';

import Cell from './Cell';

const Arena = ({ arena, rotated }) => {
  const { state } = useContext(StatusContext);
  const checkSparkling = (type, y) => state.sparkling && type !== '0' && y === arena.length - 1;
  const checkExploding = (item) => state.explodingPos && item && item.name === 'fire';

  return (
    <StyledArena width={arena[0].length} height={arena.length} rotated={rotated}>
      {arena.map((row, y) =>
        row.map(([type, , item], idx) => (
          <Cell
            key={idx}
            type={type}
            item={item}
            sparkling={checkSparkling(type, y)}
            exploding={checkExploding(item)}
          />
        )),
      )}
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

  ${({ rotated }) =>
    rotated &&
    css`
      transform: rotate(-180deg);
      transition: transform 300ms ease-in-out;
    `}
  transition: transform 300ms ease-in-out;
`;
