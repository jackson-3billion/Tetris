import { useEffect } from 'react';

import { fixDpi } from '@utils/canvas';

const useResize = (canvasRef) => {
  useEffect(() => {
    if (!canvasRef?.current) return;

    const canvas = canvasRef.current;
    fixDpi(canvas);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fixDpi(canvas);
    };

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, [canvasRef]);
};

export default useResize;
