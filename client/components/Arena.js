import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ARENA_HEIGHT, ARENA_WIDTH } from '@utils/constants';

import Cell from '@components/Cell';

const Arena = ({ arena, rotated, flipped, explodingPos }) => {
  const checkExploding = useCallback((item) => item && item.name === 'fire', []);

  return (
    <Wrapper flipped={flipped}>
      <StyledArena width={ARENA_WIDTH} height={ARENA_HEIGHT} rotated={rotated}>
        {arena.map((row, y) =>
          row.map(([type, , item], idx) => (
            <Cell
              key={idx}
              type={type}
              item={item}
              sparkling={item && item.sparkling}
              exploding={explodingPos && checkExploding(item)}
            />
          )),
        )}
      </StyledArena>
    </Wrapper>
  );
};

export default Arena;

const Wrapper = styled.div`
  width: 100%;
  max-width: 25vw;
  transition: transform 500ms ease-in-out;

  ${({ flipped }) =>
    flipped &&
    css`
      transform: rotateY(180deg);
    `}
`;

const StyledArena = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${({ height }) => height},
    calc((25vw - (${({ width }) => width - 1 + 'px'})) / ${({ width }) => width})
  );
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-gap: 1px;
  width: 100%;
  max-width: 25vw;
  background: #111;
  transition: transform 500ms ease-in-out;

  ${({ rotated }) =>
    rotated &&
    css`
      transform: rotate(-180deg);
    `}
`;
