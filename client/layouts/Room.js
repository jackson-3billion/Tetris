import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';

import useSnowfallToggle from '@hooks/useSnowfallToggle';
import useBgmToggle from '@hooks/useBgmToggle';

import Snowfall from '@components/Snowfall';
import Home from '@components/Home';

const Room = () => {
  const [showSnowfall, setShowSnowfall, SnowfallToggler] = useSnowfallToggle();
  const [playing, setPlaying, BgmToggler] = useBgmToggle();

  return (
    <Wrapper>
      <Options>
        <SnowfallToggler />
        <BgmToggler />
      </Options>
      {showSnowfall && <Snowfall />}
      <Outlet />
      <Home />
    </Wrapper>
  );
};

export default Room;

const Wrapper = styled.div`
  //background-color: black;
  background-color: #292929;
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Options = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  width: 20%;
  min-width: 300px;
  z-index: 1;
  & > div {
    font-size: 1.2rem;
  }
`;
