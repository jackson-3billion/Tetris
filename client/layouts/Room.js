import React from 'react';
import { Outlet } from 'react-router-dom';

import Home from '@components/Home';

const Room = () => {
  return (
    <>
      <Outlet />
      <Home />
    </>
  );
};

export default Room;
