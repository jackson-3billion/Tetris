import React from 'react';
import styled from '@emotion/styled';
import { ImMusic } from 'react-icons/im';
import { IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5';
import { MdCircle } from 'react-icons/md';

import useBgmPlayer from '@hooks/useBgmPlayer';

import { BGM_NUM } from '@utils/constants';

const BgmPlayer = () => {
  const [playing, playingIdx, handleBgmToggle, handlePrevClick, handleNextClick] = useBgmPlayer();

  return (
    <Wrapper>
      <Player show={playing}>
        <Prev show={playing} onClick={handlePrevClick}>
          <IoPlaySkipBack color="white" size="14px" />
        </Prev>
        <BgmToggler id="bgm" type="checkbox" checked={playing} onChange={handleBgmToggle} />
        <BgmLabel htmlFor="bgm">
          <Circle show={playing}>
            <ImMusic color="white" />
          </Circle>
        </BgmLabel>
        <Next show={playing} onClick={handleNextClick}>
          <IoPlaySkipForward color="white" size="14px" />
        </Next>
      </Player>
      <Nav show={playing}>
        {Array.from({ length: BGM_NUM }, (_, idx) => (
          <Dot key={idx} playing={idx === playingIdx}>
            <MdCircle size="8px" />
          </Dot>
        ))}
      </Nav>
    </Wrapper>
  );
};

export default BgmPlayer;

const Wrapper = styled.div``;

const Prev = styled.div``;

const Next = styled.div``;

const Player = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > ${Prev}, ${Next} {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 14px;
    &:hover {
      cursor: pointer;
    }
    & > svg {
      display: ${({ show }) => (show ? 'block' : 'none')};
    }
  }
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

const Circle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1px;
  margin: 0 2px;
  background-color: ${({ show }) => (show ? '#787586' : 'transparent')};
  cursor: pointer;
  &:hover {
    border: 2px solid white;
  }
`;

const Nav = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const Dot = styled.span`
  & > svg {
    fill: ${({ playing }) => (playing ? '#FFA58F' : 'white')};
  }

  margin: -3px 2px 0;
`;
