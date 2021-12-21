import React, { createContext, useState } from 'react';

const ItemsContext = createContext({
  state: {
    items: [],
    sparkling: false,
  },
  actions: {
    setItems: () => {},
    setSparkling: () => {},
  },
});

const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [sparkling, setSparkling] = useState(false);
  const value = {
    state: { items, sparkling },
    actions: { setItems, setSparkling },
  };

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};

export { ItemsProvider };

export default ItemsContext;
