import React, { memo } from 'react';
import styled from '@emotion/styled';

import Cell from '@components/Cell';

const Preview = ({ tetromino }) => {
  return (
    <PreviewArena height={tetromino.length} width={tetromino[0].length}>
      {tetromino.map((row) => row.map(([type], idx) => <Cell key={idx} type={type} />))}
    </PreviewArena>
  );
};

export default memo(Preview);

const PreviewArena = styled.div`
  display: grid;
  grid-template-rows: repeat(${({ height }) => height}, calc((100px) / ${({ width }) => width}));
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
`;
