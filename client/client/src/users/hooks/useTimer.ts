import { useState, useEffect, useCallback } from "react";

const useTimer = () => {
  const [seconds, setSeconds] = useState(60*60*24);

  const decrementTimer = useCallback(() => {
    if (seconds === 0) {
      // Timer reached 0, stop the timer
      return undefined;
    }

    setSeconds((prevSeconds) => prevSeconds - 1);
  }, [seconds]);

  useEffect(() => {
    let interval = setInterval(decrementTimer, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [decrementTimer]);

  return seconds ;
};

export default useTimer;

