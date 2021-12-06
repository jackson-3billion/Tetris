import React from 'react';
import styled from '@emotion/styled';

import { IoIosHome } from 'react-icons/io';
import { lighten } from 'polished';

const Home = ({ style = {}, onClick }) => {
  return (
    <HomeWrapper onClick={onClick} {...style}>
      <IoIosHome size={'100%'} />
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  width: ${({ width }) => width || '4%'};
  position: ${({ position }) => position || 'fixed'};
  bottom: ${({ bottom }) => bottom || '0.5rem'};
  right: ${({ right }) => right || '0.7rem'};
  color: #363636;
  &:hover {
    cursor: pointer;
    color: ${({ color }) => lighten(0.5, color || '#363636')};
  }
  /* @media all and(min-width: 801px) and (max-width: 1000px) {
    width: 5%;
  }

  @media all and (min-width: 601px) and (max-width: 800px) {
    width: 6%;
  } */

  @media all and (max-width: 600px) {
    width: ${({ mobileWidth }) => mobileWidth || '10%'};
  }
`;
