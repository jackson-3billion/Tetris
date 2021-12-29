import React, { createContext, useState } from 'react';

const OpponentStatusContext = createContext({
  state: {
    explodingPos: null,
    catJamming: false,
    rotated: false,
    flipped: false,
  },
  actions: {
    setExplodindPos: () => {},
    setCatJamming: () => {},
    setRotated: () => {},
    setFlipped: () => {},
  },
});

const OpponentStatusProvider = ({ children }) => {
  const [explodingPos, setExplodingPos] = useState(null);
  const [catJamming, setCatJamming] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const value = {
    state: { explodingPos, catJamming, rotated, flipped },
    actions: { setExplodingPos, setCatJamming, setRotated, setFlipped },
  };

  return <OpponentStatusContext.Provider value={value}>{children}</OpponentStatusContext.Provider>;
};

export { OpponentStatusProvider };

export default OpponentStatusContext;
