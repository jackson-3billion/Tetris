import React, { createContext, useState } from 'react';

const StatusContext = createContext({
  state: {
    items: [],
    level: 0,
    accel: 0,
    sparkling: false,
    explodingPos: null,
    catJamming: false,
    rotated: false,
    flipped: false,
  },
  actions: {
    setItems: () => {},
    setLevel: () => {},
    setAccel: () => {},
    setSparkling: () => {},
    setExplodindPos: () => {},
    setCatJamming: () => {},
    setRotated: () => {},
    setFlipped: () => {},
  },
});

const StatusProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [level, setLevel] = useState(1);
  const [accel, setAccel] = useState(0);
  const [sparkling, setSparkling] = useState(false);
  const [explodingPos, setExplodingPos] = useState(null);
  const [catJamming, setCatJamming] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const value = {
    state: { items, level, accel, sparkling, explodingPos, catJamming, rotated, flipped },
    actions: { setItems, setLevel, setAccel, setSparkling, setExplodingPos, setCatJamming, setRotated, setFlipped },
  };

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
};

export { StatusProvider };

export default StatusContext;
