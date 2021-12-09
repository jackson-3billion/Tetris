import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <Link to="/game/create">Create Room</Link>
      <Link to="/game/join">Join Room</Link>
    </>
  );
};

export default Main;
