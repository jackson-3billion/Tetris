import React, { createContext, useState, useCallback } from 'react';

import { TETROMINOS } from '@utils/tetrominos';

const OpponentStatusContext = createContext({
  state: {
    level: 0,
    score: 0,
    finalScore: 0,
    explodingPos: null,
    catJamming: false,
    rotated: false,
    flipped: false,
    preview: null,
  },
  actions: {
    setLevel: () => {},
    setScore: () => {},
    setFinalScore: () => {},
    setExplodindPos: () => {},
    setCatJamming: () => {},
    setRotated: () => {},
    setFlipped: () => {},
    setPreview: () => {},
    resetStatus: () => {},
  },
});

const OpponentStatusProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(-1);
  const [explodingPos, setExplodingPos] = useState(null);
  const [catJamming, setCatJamming] = useState(false);
  const [rotated, setRotated] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [preview, setPreview] = useState(TETROMINOS[0].preview);

  const resetStatus = useCallback(() => {
    setLevel(1);
    setScore(0);
    setFinalScore(-1);
    setExplodingPos(null);
    setCatJamming(false);
    setRotated(false);
    setFlipped(false);
    setPreview(TETROMINOS[0].preview);
  }, []);

  const value = {
    state: { level, score, finalScore, explodingPos, catJamming, rotated, flipped, preview },
    actions: {
      setLevel,
      setScore,
      setFinalScore,
      setExplodingPos,
      setCatJamming,
      setRotated,
      setFlipped,
      setPreview,
      resetStatus,
    },
  };

  return <OpponentStatusContext.Provider value={value}>{children}</OpponentStatusContext.Provider>;
};

export { OpponentStatusProvider };

export default OpponentStatusContext;
