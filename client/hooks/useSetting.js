import React from 'react';
import { FiSettings } from 'react-icons/fi';
import styled from '@emotion/styled';

import useModal from '@hooks/useModal';

import SettingModalContent from '@components/SettingModalContent';

const useSetting = () => {
  const modalStyles = { backgroundColor: '#737373', overlayColor: 'black', height: '60%' };
  const [isSettingModalOpen, openSettingModal, hideSettingModal, SettingModal, toggleModal] = useModal({
    styles: modalStyles,
    closableOverlay: true,
  });

  const Setting = () => (
    <Wrapper>
      <SettingCheckbox id="setting" type="checkbox" checked={isSettingModalOpen} onChange={toggleModal} />
      <SettingLabel htmlFor="setting">
        <Circle show={isSettingModalOpen}>
          <FiSettings color="white" />
        </Circle>
      </SettingLabel>
      {isSettingModalOpen && (
        <SettingModal>
          <SettingModalContent handleOkay={hideSettingModal} />
        </SettingModal>
      )}
    </Wrapper>
  );

  return [toggleModal, Setting];
};

export default useSetting;

const Wrapper = styled.div``;

const SettingCheckbox = styled.input`
  display: none;
`;

const SettingLabel = styled.label`
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
  //padding-right: 1px;
  background-color: ${({ show }) => (show ? '#787586' : 'transparent')};
  cursor: pointer;
  &:hover {
    border: 2px solid white;
  }
`;
