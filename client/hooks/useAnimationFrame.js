import { useState, useRef, useEffect, useCallback } from 'react';

const useAnimationFrame = (callback, delay, started) => {
  const [interval, setInterval] = useState(delay);
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
    if (!started) return;

    const update = (time = 0) => {
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
