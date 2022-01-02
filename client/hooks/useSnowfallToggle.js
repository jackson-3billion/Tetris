import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';

const useSnowfallToggle = () => {
  const [showSnowfall, setShowSnowfall] = useState(true);
  const handleSnowfallToggle = useCallback(() => setShowSnowfall((show) => !show), []);

  const SnowfallToggler = () => (
    <Wrapper>
      <SnowfallCheckbox id="snowfall" type="checkbox" checked={showSnowfall} onChange={handleSnowfallToggle} />
      <SnowfallLabel htmlFor="snowfall">Animation {showSnowfall ? 'ON' : 'OFF'}</SnowfallLabel>
    </Wrapper>
  );

  return [showSnowfall, setShowSnowfall, SnowfallToggler];
};

export default useSnowfallToggle;

const Wrapper = styled.div`
  width: 100%;
  min-width: 115px;
`;

const SnowfallCheckbox = styled.input`
  display: none;
`;

const SnowfallLabel = styled.label`
  color: white;
  cursor: pointer;
  &:hover {
    color: salmon;
  }
`;
