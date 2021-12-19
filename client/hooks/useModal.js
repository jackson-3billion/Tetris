import React, { useState } from 'react';

import Modal from '@components/common/Modal';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const openModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const ModalContainer = ({ children }) => {
    return <>{isModalOpen && <Modal hideModal={hideModal}>{children}</Modal>}</>;
  };

  return [isModalOpen, openModal, hideModal, ModalContainer];
};

export default useModal;
