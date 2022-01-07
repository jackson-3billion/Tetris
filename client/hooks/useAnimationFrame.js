import { useState, useRef, useEffect, useCallback } from 'react';

const useAnimationFrame = (callback, delay, started) => {
  const [interval, setInterval] = useState(delay);
  const [playing, setPlaying] = useState(started);
  const timeRef = useRef(0);
  const counterRef = useRef(0);
  const savedCallbackRef = useRef();
  const requestIdRef = useRef();
  const cancelAnimation = useCallback(() => cancelAnimationFrame(requestIdRef.current), []);

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // 가끔씩 clean-up 함수가 정상적으로 cancelAnimationFrame을 못하는 버그가 있음.
    cancelAnimationFrame(requestIdRef.current);
    if (!playing) {
      cancelAnimationFrame(requestIdRef.current);
      return () => cancelAnimationFrame(requestIdRef.current);
    }

    const update = (time = 0) => {
      console.log(`update called ${playing}`);
      if (!playing) {
        return cancelAnimationFrame(requestIdRef.current);
      }
      const timeDiff = time - timeRef.current;
      counterRef.current += timeDiff;
      timeRef.current = time;

      if (counterRef.current > interval) {
        savedCallbackRef.current();
        counterRef.current = 0;
      }
      cancelAnimationFrame(requestIdRef.current);
      requestIdRef.current = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(requestIdRef.current);
  }, [interval, playing]);

  return [interval, setInterval, playing, setPlaying, cancelAnimation];
};

export default useAnimationFrame;
