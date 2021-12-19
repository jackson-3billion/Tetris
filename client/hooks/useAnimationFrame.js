import { useState, useRef, useEffect, useCallback } from 'react';

const useAnimationFrame = (callback, _delay, started) => {
  const [delay, setDelay] = useState(_delay);
  const timeRef = useRef(0);
  const counterRef = useRef(0);
  const savedCallbackRef = useRef();
  const requestIdRef = useRef();

  const cancelAnimation = useCallback(() => cancelAnimationFrame(requestIdRef.current), []);

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!started) return;

    const update = (time = 0) => {
      const timeDiff = time - timeRef.current;
      counterRef.current += timeDiff;
      timeRef.current = time;

      if (counterRef.current > delay) {
        savedCallbackRef.current();
        counterRef.current = 0;
      }
      requestIdRef.current = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(requestIdRef.current);
  }, [delay, started]);

  return [delay, setDelay, cancelAnimation];
};

export default useAnimationFrame;
