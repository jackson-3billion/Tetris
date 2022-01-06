import React, { createContext, useState } from 'react';

const StatusContext = createContext({
  state: {
    items: [],
    level: 0,
    accel: 0,
    score: 0,
    explodingPos: null,
    catJamming: false,
    rotated: false,
    flipped: false,
  },
  actions: {
    setItems: () => {},
    setLevel: () => {},
    setAccel: () => {},
    setScore: () => {},
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
  const [score, setScore] = useState(0);
  const [explodingPos, setExplodingPos] = useState(null);
  const [catJamming, setCatJamming] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const value = {
    state: { items, level, accel, score, explodingPos, catJamming, rotated, flipped },
    actions: { setItems, setLevel, setAccel, setScore, setExplodingPos, setCatJamming, setRotated, setFlipped },
  };

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
};

export { StatusProvider };

export default StatusContext;
