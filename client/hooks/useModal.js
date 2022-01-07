import React, { useState } from 'react';

import Modal from '@components/common/Modal';

const useModal = ({ closableOverlay, styles } = {}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const ModalContainer = ({ children }) => {
    return (
      <>
        {isModalOpen && (
          <Modal closableOverlay={closableOverlay} hideModal={hideModal} styles={styles}>
            {children}
          </Modal>
        )}
      </>
    );
  };

  return [isModalOpen, openModal, hideModal, ModalContainer, setIsModalOpen];
};

export default useModal;
