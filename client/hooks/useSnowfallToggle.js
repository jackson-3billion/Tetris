import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { BsCloudSnowFill } from 'react-icons/bs';

const useSnowfallToggle = () => {
  const [showSnowfall, setShowSnowfall] = useState(true);
  const handleSnowfallToggle = useCallback(() => setShowSnowfall((show) => !show), []);

  const SnowfallToggler = () => (
    <Wrapper>
      <SnowfallCheckbox id="snowfall" type="checkbox" checked={showSnowfall} onChange={handleSnowfallToggle} />
      <SnowfallLabel htmlFor="snowfall">
        <Circle show={showSnowfall}>
          <BsCloudSnowFill color="white" />
        </Circle>
      </SnowfallLabel>
    </Wrapper>
  );

  return [showSnowfall, setShowSnowfall, SnowfallToggler];
};

export default useSnowfallToggle;

const Wrapper = styled.div`
  margin-right: 1rem;
`;

const SnowfallCheckbox = styled.input`
  display: none;
`;

const SnowfallLabel = styled.label`
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
