import React, { createContext, useState } from 'react';

const OpponentStatusContext = createContext({
  state: {
    level: 0,
    score: 0,
    explodingPos: null,
    catJamming: false,
    rotated: false,
    flipped: false,
  },
  actions: {
    setLevel: () => {},
    setScore: () => {},
    setExplodindPos: () => {},
    setCatJamming: () => {},
    setRotated: () => {},
    setFlipped: () => {},
  },
});

const OpponentStatusProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [explodingPos, setExplodingPos] = useState(null);
  const [catJamming, setCatJamming] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const value = {
    state: { level, score, explodingPos, catJamming, rotated, flipped },
    actions: { setLevel, setScore, setExplodingPos, setCatJamming, setRotated, setFlipped },
  };

  return <OpponentStatusContext.Provider value={value}>{children}</OpponentStatusContext.Provider>;
};

export { OpponentStatusProvider };

export default OpponentStatusContext;
