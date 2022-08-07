import { useEffect, useState } from 'react';

const convertTimeDiff = (diff: number) => ({
  dd: Math.floor(diff / (1000 * 60 * 60 * 24)),
  hh: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  mm: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
  ss: Math.floor((diff % (1000 * 60)) / 1000),
});

export default function useTimer(timestamp?: number) {
  const [timer, setTimer] = useState<{
    dd: number;
    hh: number;
    mm: number;
    ss: number;
  }>();

  useEffect(() => {
    if (typeof timestamp === 'undefined') {
      return;
    }

    const intervalId = setInterval(() => {
      setTimer(convertTimeDiff(timestamp - Date.now()));
    }, 1000);

    setTimer(convertTimeDiff(timestamp - Date.now()));

    return () => clearInterval(intervalId);
  }, [timestamp]);

  return timer;
}
