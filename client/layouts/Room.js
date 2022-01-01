import React from 'react';
import { Outlet } from 'react-router-dom';

import Home from '@components/Home';
import Snowfall from '@components/Snowfall';

const Room = () => {
  return (
    <>
      <Snowfall />
      <Outlet />
      <Home />
    </>
  );
};

export default Room;
