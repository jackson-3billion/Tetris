import { useState, useEffect, useCallback, useRef } from 'react';
import { BGM_NUM } from '@utils/constants';

const useBgmPlayer = () => {
  const bgmRef = useRef();
  const [playingIdx, setPlayingIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const handleBgmToggle = useCallback(() => setPlaying((p) => !p), []);
  const handlePrevClick = () => setPlayingIdx((prevIdx) => (prevIdx === 0 ? BGM_NUM - 1 : prevIdx - 1));
  const handleNextClick = () => setPlayingIdx((prevIdx) => (prevIdx === BGM_NUM - 1 ? 0 : prevIdx + 1));

  useEffect(() => {
    return () => {
      if (bgmRef?.current) {
        bgmRef.current.pause();
        bgmRef.current.removeEventListener('ended', handleNextClick);
      }
    };
  }, []);

  useEffect(() => {
    if (!bgmRef?.current) {
      return;
    }
    const bgm = bgmRef.current;

    if (!playing) {
      return bgm.pause();
    }
    if (playing) {
      return bgm.play();
    }
  }, [playing]);

  useEffect(() => {
    // when first loaded
    if (!bgmRef?.current) {
      bgmRef.current = new Audio(`../bgms/${playingIdx}.mp3`);
      bgmRef.current.addEventListener('ended', handleNextClick);
      return;
    }

    bgmRef.current.pause();
    bgmRef.current.removeEventListener('ended', handleNextClick);

    const newBgm = new Audio(`../bgms/${playingIdx}.mp3`);
    newBgm.play();
    newBgm.addEventListener('ended', handleNextClick);
    bgmRef.current = newBgm;

    if (playingIdx !== 0) {
      newBgm.volume = 0.3;
    }
  }, [playingIdx]);

  return [playing, playingIdx, setPlayingIdx, handleBgmToggle, handlePrevClick, handleNextClick];
};

export default useBgmPlayer;
