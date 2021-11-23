import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  const getRandomId = useCallback(() => {
    const ids = [1, 2, 3, 4, 5];

    return ids[Math.floor(Math.random() * ids.length)];
  }, []);

  return (
    <>
      <div>Main 입니다</div>
      <Link to={`/game/${getRandomId()}`}>방생성</Link>
    </>
  );
};

export default Main;
