import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import Snowflake from '@utils/snowflake';
//import { fixDpi } from '@utils/canvas';

const Snowfall = () => {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    //fixDpi(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    //ctx.fillStyle = ctx.strokeStyle = 'white';
    // ctx.filter = 'blur(2px)';

    const snowflakes = [];
    for (let i = 0; i < 3; i++) {
      snowflakes.push(new Snowflake(canvas, i));
    }
    //snowflakes.forEach((snowflake) => snowflake.render());

    const animateFlakes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < snowflakes.length; i++) {
        snowflakes[i].update();
      }
      //snowflakes.forEach((snowflake) => snowflake.update());

      requestAnimationFrame(animateFlakes);
    };

    animateFlakes();
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default Snowfall;

const Canvas = styled.canvas`
  background-color: black;
  position: absolute;
  z-index: -1;
`;
