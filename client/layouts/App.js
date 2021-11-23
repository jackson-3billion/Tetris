import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Main = loadable(() => import('@pages/Main'));
const GameRoom = loadable(() => import('@pages/GameRoom'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/game/:id" element={<GameRoom />} />
    </Routes>
  );
};

export default App;
