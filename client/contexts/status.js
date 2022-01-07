import React, { createContext, useState, useCallback } from 'react';

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
    direction: -1,
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
    resetStatus: () => {},
    setDirection: () => {},
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
  const [direction, setDirection] = useState(-1);

  const resetStatus = useCallback(() => {
    setItems([]);
    setLevel(1);
    setAccel(0);
    setScore(0);
    setExplodingPos(null);
    setCatJamming(false);
    setRotated(false);
    setFlipped(false);
  }, []);

  const value = {
    state: { items, level, accel, score, explodingPos, catJamming, rotated, flipped, direction },
    actions: {
      setItems,
      setLevel,
      setAccel,
      setScore,
      setExplodingPos,
      setCatJamming,
      setRotated,
      setFlipped,
      resetStatus,
      setDirection,
    },
  };

  return <StatusContext.Provider value={value}>{children}</StatusContext.Provider>;
};

export { StatusProvider };

export default StatusContext;
