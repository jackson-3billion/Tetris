import { useState, useRef, useEffect } from 'react';

const useAnimationFrame = (callback, _delay, playing) => {
  const [delay, setDelay] = useState(_delay);
  const timeRef = useRef(0);
  const counterRef = useRef(0);
  const savedCallbackRef = useRef();
  const requestIdRef = useRef();

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!playing) {
      return;
    }
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

    requestIdRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(requestIdRef.current);
  }, [delay, playing]);

  return [delay, setDelay, requestIdRef];
};

export default useAnimationFrame;
