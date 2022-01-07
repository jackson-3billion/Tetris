import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import StatusContext from '@contexts/status';

import Room from '@layouts/Room';

const Main = loadable(() => import('@pages/Main'));
const Create = loadable(() => import('@pages/CreateRoom'));
const Join = loadable(() => import('@pages/JoinRoom'));
const Game = loadable(() => import('@pages/GameRoom'));
const Full = loadable(() => import('@pages/FullRoom'));

const App = () => {
  const {
    actions: { setDirection },
  } = useContext(StatusContext);

  useEffect(() => {
    const direction = localStorage.getItem('direction') || -1;
    setDirection(Number(direction));
  }, [setDirection]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="game" element={<Room />}>
          <Route path="create" element={<Create />} />
          <Route path="join" element={<Join />} />
          <Route path="join/:id" element={<Join />} />
          <Route path=":id" element={<Game />} />
          <Route path="full" element={<Full />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
