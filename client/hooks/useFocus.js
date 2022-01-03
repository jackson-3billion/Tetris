import { useEffect } from 'react';

const useFocus = (ref) => {
  useEffect(() => {
    if (!ref?.current) return;

    ref.current.focus();
  }, [ref]);
};

export default useFocus;
