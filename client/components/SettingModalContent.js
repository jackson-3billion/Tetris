import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { lighten } from 'polished';

import StatusContext from '@contexts/status';

import {
  BsFillArrowLeftSquareFill,
  BsFillArrowUpSquareFill,
  BsFillArrowRightSquareFill,
  BsFillArrowDownSquareFill,
} from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';

import Button from '@components/Button';

const SettingModalContent = ({ handleOkay }) => {
  const {
    state: { direction },
    actions: { setDirection },
  } = useContext(StatusContext);

  const handleClockwiseClick = () => {
    setDirection((d) => d * -1);
    localStorage.setItem('direction', direction * -1);
  };

  return (
    <Wrapper>
      <Header>
        <FiSettings size="2rem" />
        <Title>Settings</Title>
      </Header>
      <Keys>
        <Arrows>
          Arrow keys
          <span>
            <BsFillArrowLeftSquareFill color="white" size="1.5rem" />
            <BsFillArrowRightSquareFill color="white" size="1.5rem" />
            <BsFillArrowDownSquareFill color="white" size="1.5rem" />
          </span>
        </Arrows>
        <Rotate>
          Rotate
          <span>
            <BsFillArrowUpSquareFill color="white" size="1.5rem" />
          </span>
        </Rotate>
        <Direction>
          Direction
          <span>
            <ClockwiseCheckbox id="setting" type="checkbox" checked={direction === 1} onChange={handleClockwiseClick} />
            <span>Clockwise</span>
          </span>
        </Direction>
        <div>
          Drop
          <span>
            <SpaceKey>Spacebar</SpaceKey>
          </span>
        </div>
        <div>
          Pause
          <span>
            <Key>P</Key>
          </span>
        </div>
        <div>
          Settings
          <span>
            <Key>S</Key>
          </span>
        </div>
      </Keys>
      <OkayButton callback={handleOkay}>OKAY</OkayButton>
    </Wrapper>
  );
};

export default SettingModalContent;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0 2rem;
  background-color: #4c4c4c;
  display: flex;
  align-items: center;
  position: absolute;
  top: 2rem;
  color: white;

  & > svg {
    & > path {
      stroke: white;
    }
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
`;

const Keys = styled.div`
  font-size: 1.6rem;
  width: 40%;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Arrows = styled.div`
  & > span > svg {
    margin: 0 2px;
  }
`;

const Rotate = styled.div`
  position: relative;
`;

const Direction = styled.div`
  & > span > span {
    font-size: 1.2rem;
  }
`;

const ClockwiseCheckbox = styled.input``;

const OkayButton = styled(Button)`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  border-radius: 10px;
  padding: 0.5rem 0;
  background-color: #d5cabd;
  font-size: 1.4rem;
  color: black;
  &:hover {
    background-color: ${lighten(0.1, '#D5CABD')};
  }
`;

const Key = styled.div`
  width: 24px;
  height: 24px;
  background-color: white;
  font-size: 1rem;
  color: #737373;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpaceKey = styled.div`
  width: 80px;
  height: 24px;
  background-color: white;
  font-size: 1rem;
  color: #737373;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
