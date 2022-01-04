import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from '@emotion/styled';

import StatusContext from '@contexts/status';

const Timer = ({ playing, paused }) => {
  const { actions } = useContext(StatusContext);
  const { setLevel } = actions;
  const [time, setTime] = useState({ min: 0, sec: 0 });
  const timerIdRef = useRef();

  useEffect(() => {
    if (playing && !paused) {
      timerIdRef.current = setInterval(() => {
        setTime(({ min, sec }) => {
          if (++sec === 60) {
            ++min;
            sec = 0;
          }
          return { min, sec };
        });
      }, 1000);
      return;
    }
    clearTimeout(timerIdRef.current);

    return () => clearTimeout(timerIdRef.current);
  }, [playing, paused]);

  useEffect(() => {
    if (time.sec === 29 || time.sec === 59) {
      setLevel((prevLevel) => prevLevel + 1);
    }
  }, [time, setLevel]);

  return (
    <TimerBox>
      <Minutes>{String(time.min).padStart(2, '0')}</Minutes>
      <Colon>:</Colon>
      <Seconds>{String(time.sec).padStart(2, '0')}</Seconds>
    </TimerBox>
  );
};

export default Timer;

const TimerBox = styled.div`
  color: white;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8%;
`;

const Minutes = styled.span``;

const Colon = styled.span`
  margin: 0 0.5rem;
`;

const Seconds = styled.span``;
