import React, { createContext, useState } from 'react';

import { TETROMINOS } from '@utils/tetrominos';

const OpponentStatusContext = createContext({
  state: {
    level: 0,
    score: 0,
    explodingPos: null,
    catJamming: false,
    rotated: false,
    flipped: false,
    preview: null,
  },
  actions: {
    setLevel: () => {},
    setScore: () => {},
    setExplodindPos: () => {},
    setCatJamming: () => {},
    setRotated: () => {},
    setFlipped: () => {},
    setPreview: () => {},
  },
});

const OpponentStatusProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [explodingPos, setExplodingPos] = useState(null);
  const [catJamming, setCatJamming] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [preview, setPreview] = useState(TETROMINOS[0].preview);
  const value = {
    state: { level, score, explodingPos, catJamming, rotated, flipped, preview },
    actions: { setLevel, setScore, setExplodingPos, setCatJamming, setRotated, setFlipped, setPreview },
  };

  return <OpponentStatusContext.Provider value={value}>{children}</OpponentStatusContext.Provider>;
};

export { OpponentStatusProvider };

export default OpponentStatusContext;
