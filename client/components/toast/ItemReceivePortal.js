import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';

import ItemToast from '@components/toast/ItemToast';

const ItemReceivePortal = forwardRef((_, ref) => {
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
          <ItemToast key={item.id} name={item.name} description={item.description} isSending={false} />
        ))}
      </InnerContainer>
    </ItemToastContainer>,
    document.getElementById('item-receive-portal'),
  );
});

export default ItemReceivePortal;

const ItemToastContainer = styled.div`
  position: absolute;
  top: calc(50% + 100px);
  left: 30%;
  width: 20%;
`;

const InnerContainer = styled.div`
  position: relative;
`;
