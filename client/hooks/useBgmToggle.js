import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { ImMusic } from 'react-icons/im';

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
      <BgmLabel htmlFor="bgm">
        <Circle show={playing}>
          <ImMusic color="white" />
        </Circle>
      </BgmLabel>
    </Wrapper>
  );

  return [playing, setPlaying, BgmPlayer];
};

export default useBgmToggle;

const Wrapper = styled.div``;

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

const Circle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1px;
  background-color: ${({ show }) => (show ? '#787586' : 'transparent')};
  cursor: pointer;
  &:hover {
    border: 2px solid white;
  }
`;
