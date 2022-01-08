import { useState, useRef, useEffect, useCallback } from 'react';

const useAnimationFrame = (callback, delay, started) => {
  const [interval, setInterval] = useState(delay);
  const timeRef = useRef(0);
  const counterRef = useRef(0);
  const savedCallbackRef = useRef();
  const playingRef = useRef(started); // request가 종료되지 않는 버그때문에 update 함수 종료를 위해 추가
  const requestIdRef = useRef();
  const cancelAnimation = useCallback(() => cancelAnimationFrame(requestIdRef.current), []);

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    playingRef.current = started;
    if (!started) return;

    const update = (time = 0) => {
      if (!playingRef.current) return;
      const timeDiff = time - timeRef.current;
      counterRef.current += timeDiff;
      timeRef.current = time;

      if (counterRef.current > interval) {
        savedCallbackRef.current();
        counterRef.current = 0;
      }
      requestIdRef.current = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(requestIdRef.current);
  }, [interval, started]);

  return [interval, setInterval, cancelAnimation];
};

export default useAnimationFrame;
