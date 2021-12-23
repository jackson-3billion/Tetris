import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled from '@emotion/styled';
import ReactDOM from 'react-dom';
import { v4 as uuid } from 'uuid';

import ItemToast from '@components/toast/ItemToast';

const ItemToastPortal = forwardRef((_, ref) => {
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
      {items.map((item) => (
        <ItemToast key={item.id} name={item.name} description={item.description} delay={2000} />
      ))}
    </ItemToastContainer>,
    document.getElementById('item-sent-portal'),
  );
});

export default ItemToastPortal;

const ItemToastContainer = styled.div`
  border: 2px solid green;
  position: absolute;
  top: 300px;
  left: calc(30%);
  width: 20%;
  height: 80px;
  //left: 50%;
  //transform: translate(-50%, -50%);
  //width: 15%;
`;
