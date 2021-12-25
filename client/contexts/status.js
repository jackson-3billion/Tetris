import React, { createContext, useState } from 'react';

const StatusContext = createContext({
  state: {
    level: 0,
    speed: 0,
    items: [],
    sparkling: false,
  },
  actions: {
    setLevel: () => {},
    setSpeed: () => {},
    setItems: () => {},
    setSparkling: () => {},
  },
});

const StatusProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(1000);
  const [items, setItems] = useState([]);
  const [sparkling, setSparkling] = useState(false);
  const value = {
    state: { level, speed, items, sparkling },
    actions: { setLevel, setSpeed, setItems, setSparkling },
  };

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
};

export { StatusProvider };

export default StatusContext;
