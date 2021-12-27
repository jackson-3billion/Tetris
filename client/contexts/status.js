import React, { createContext, useState } from 'react';

const StatusContext = createContext({
  state: {
    level: 0,
    accel: 0,
    items: [],
    sparkling: false,
    explodingPos: null,
    catJamming: false,
    rotated: false,
  },
  actions: {
    setLevel: () => {},
    setAccel: () => {},
    setItems: () => {},
    setSparkling: () => {},
    setExplodindPos: () => {},
    setCatJamming: () => {},
    setRotated: () => {},
  },
});

const StatusProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [accel, setAccel] = useState(0);
  const [items, setItems] = useState([]);
  const [sparkling, setSparkling] = useState(false);
  const [explodingPos, setExplodingPos] = useState(null);
  const [catJamming, setCatJamming] = useState(false);
  const [rotated, setRotated] = useState(false);
  const value = {
    state: { level, accel, items, sparkling, explodingPos, catJamming, rotated },
    actions: { setLevel, setAccel, setItems, setSparkling, setExplodingPos, setCatJamming, setRotated },
  };

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
};

export { StatusProvider };

export default StatusContext;
