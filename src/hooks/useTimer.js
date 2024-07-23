import { useState, useEffect } from 'react';

function useTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const stopTimer = () => {
    setIsRunning(false);
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  const seconds = Math.floor(time / 100);
  const milliseconds = time % 100;

  return { seconds, milliseconds, stopTimer, startTimer, resetTimer };
}

export default useTimer;
