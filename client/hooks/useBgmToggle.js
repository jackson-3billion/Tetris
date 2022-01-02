import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';

const useBgmToggle = () => {
  const bgmRef = useRef(new Audio('../bgms/bgm.mp3'));
  const [playing, setPlaying] = useState(false);

  const handleBgmToggle = useCallback(() => setPlaying((p) => !p), []);

  useEffect(() => {
    if (!bgmRef?.current) return;
    const bgm = bgmRef.current;

    if (playing) {
      bgm.play();
    } else {
      bgm.pause();
    }

    return () => bgm.pause();
  }, [playing]);

  const BgmPlayer = () => (
    <Wrapper>
      <BgmToggler id="bgm" type="checkbox" checked={playing} onChange={handleBgmToggle} />
      <BgmLabel htmlFor="bgm">BGM {playing ? 'ON' : 'OFF'}</BgmLabel>
    </Wrapper>
  );

  return [playing, setPlaying, BgmPlayer];
};

export default useBgmToggle;

const Wrapper = styled.div`
  width: 100%;
  min-width: 115px;
`;

const BgmToggler = styled.input`
  display: none;
`;

const BgmLabel = styled.label`
  color: white;
  cursor: pointer;
  &:hover {
    color: salmon;
  }
`;
