import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import useResize from '@hooks/useResize';

import Snowflake from '@utils/snowflake';
import { MAX_SNOWFLAKES } from '@utils/constants';

const Snowfall = () => {
  const canvasRef = useRef();
  useResize(canvasRef);

  useEffect(() => {
    let requestId;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const snowflakes = [];
    for (let i = 0; i < MAX_SNOWFLAKES; i++) {
      snowflakes.push(new Snowflake(canvas, i));
    }

    const animateFlakes = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      snowflakes.forEach((snowflake) => snowflake.update());
      requestId = requestAnimationFrame(animateFlakes);
    };

    animateFlakes();

    return () => cancelAnimationFrame(requestId);
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default Snowfall;

const Canvas = styled.canvas`
  background-color: black;
  //background-color: #0f8a5f;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
`;
