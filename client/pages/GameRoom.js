import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import useSocket from '@hooks/useSocket.js';

const GameRoom = () => {
  const { id: gameRoomId } = useParams();
  const lastTimeRef = useRef(0);
  const requestIdRef = useRef();
  const socketRef = useSocket('http://localhost:9000');

  const [counter, setCounter] = useState(100);
  const [opponentCounter, setOpponentCounter] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (socketRef?.current) {
      const socket = socketRef.current;
      socket.emit('enter', gameRoomId);
      socket.on('waiting', (data) => console.log(data));
      socket.on('start', () => setGameStarted(true));
      socket.on('full', (data) => console.log(data));
      socket.on('end', () => {
        console.log('opponent leaved the game');
        setGameStarted(false);
      });
    }
  }, [socketRef, gameRoomId]);

  useEffect(() => {
    if (!gameStarted) {
      cancelAnimationFrame(requestIdRef.current);
      return;
    }
    const render = (now) => {
      if (now - lastTimeRef.current > 1000) {
        lastTimeRef.current = now;
        setCounter((cnt) => cnt - 1);
      }
      requestIdRef.current = requestAnimationFrame(render);
    };
    render();
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted) return;
    if (!socketRef?.current) return;
    const socket = socketRef.current;
    socket.emit('counter-change', counter);
    socket.on('opponent-change', (data) => setOpponentCounter(data.counter));
  }, [gameStarted, counter, socketRef]);

  return (
    <>
      <div onClick={() => setCounter((cnt) => cnt - 1)}>counter: {counter}</div>
      <div>opponent: {opponentCounter}</div>
    </>
  );
};

export default GameRoom;
