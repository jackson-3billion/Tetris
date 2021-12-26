import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';

import ItemToast from '@components/toast/ItemToast';

const ItemSendPortal = forwardRef((_, ref) => {
  const [items, setItems] = useState([]);

  useImperativeHandle(ref, () => ({
    addItem(item) {
      const id = uuid();
      setItems([...items, { ...item, id }]);
      setTimeout(() => setItems((prevItems) => prevItems.filter((prevItem) => prevItem.id !== id)), 1000);
    },
  }));

  return ReactDOM.createPortal(
    <ItemToastContainer>
      <InnerContainer>
        {items.map((item) => (
          <ItemToast key={item.id} name={item.name} isSending={true} />
        ))}
      </InnerContainer>
    </ItemToastContainer>,
    document.getElementById('item-send-portal'),
  );
});

export default ItemSendPortal;

const ItemToastContainer = styled.div`
  position: absolute;
  top: 400px;
  left: calc(30%);
  width: 25%;
  height: 80px;
`;

const InnerContainer = styled.div`
  position: relative;
  height: 100%;
  border: 2px solid salmon;
`;
