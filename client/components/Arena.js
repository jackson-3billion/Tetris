import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { ARENA_HEIGHT, ARENA_WIDTH } from '@utils/constants';

import Cell from '@components/Cell';

const Arena = ({ isReady, arena, rotated, flipped, explodingPos }) => {
  const checkExploding = useCallback((item) => item && item.name === 'fire', []);

  return (
    <Wrapper flipped={flipped}>
      <StyledArena width={ARENA_WIDTH} height={ARENA_HEIGHT} rotated={rotated} isReady={isReady}>
        {arena.map((row) =>
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
  width: 25vw;
  display: grid;
  grid-template-rows: repeat(${({ height }) => height}, calc((25vw) / ${({ width }) => width}));
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  box-shadow: ${({ isReady }) => isReady && '0 0 10px lightblue'};

  transition: transform 500ms ease-in-out;
  border: 3px solid #7c7c7c;
  border-right-width: 2px;
  border-bottom-width: 2px;

  ${({ rotated }) =>
    rotated &&
    css`
      transform: rotate(-180deg);
    `}
`;
