import React, { createContext, useState } from 'react';

const ItemsContext = createContext({
  state: {
    items: [],
    exploding: false,
  },
  actions: {
    setItems: () => {},
    setExploding: () => {},
  },
});

const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [exploding, setExploding] = useState(false);
  const value = {
    state: { items, exploding },
    actions: { setItems, setExploding },
  };

  return <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>;
};

export { ItemsProvider };

export default ItemsContext;
