import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

import Home from '@components/Home';
import Snowfall from '@components/Snowfall';

const Room = () => {
  const [showSnowfall, setShowSnowfall] = useState(true);

  const handleSnowfallToggle = () => setShowSnowfall((show) => !show);

  return (
    <Wrapper>
      <Options>
        <SnowfallToggler id="snowfall" type="checkbox" checked={showSnowfall} onChange={handleSnowfallToggle} />
        <SnowfallTogglerLabel htmlFor="snowfall">Animation {showSnowfall ? 'ON' : 'OFF'}</SnowfallTogglerLabel>
      </Options>
      {showSnowfall && <Snowfall />}
      <Outlet />
      <Home />
    </Wrapper>
  );
};

export default Room;

const Wrapper = styled.div`
  background-color: black;
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Options = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 15%;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  & > * {
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

const SnowfallToggler = styled.input`
  display: none;
`;

const SnowfallTogglerLabel = styled.label`
  color: white;
  min-width: 50%;
`;
