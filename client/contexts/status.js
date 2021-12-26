import React, { createContext, useState } from 'react';

const StatusContext = createContext({
  state: {
    level: 0,
    accel: 0,
    items: [],
    sparkling: false,
  },
  actions: {
    setLevel: () => {},
    setAccel: () => {},
    setItems: () => {},
    setSparkling: () => {},
  },
});

const StatusProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [accel, setAccel] = useState(0);
  const [items, setItems] = useState([]);
  const [sparkling, setSparkling] = useState(false);
  const value = {
    state: { level, accel, items, sparkling },
    actions: { setLevel, setAccel, setItems, setSparkling },
  };

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
};

export { StatusProvider };

export default StatusContext;
