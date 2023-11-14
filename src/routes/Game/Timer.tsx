import { useState, useEffect } from "react";

const Timer = ({ _timeLeft }: any) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(_timeLeft);
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60) ?? "00",
      };
      return timeLeft;
    }
  };

  const [timeLeft, setTimeLeft]: any = useState();

  useEffect(() => {
    // if (!timeLeft) handleAnswers();
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);


  return (
    <h3
      style={{ color: `${timeLeft?.seconds > 15 ? "white" : "red"}` }}
      className="text-2xl lg:text-3xl 2xl:text-5xl font-medium uppercase text-white"
    >
      {"00"}:
      {timeLeft?.seconds > 9
        ? timeLeft?.seconds
        : "0" + (timeLeft?.seconds ?? 0)}
    </h3>
  );
};

export default Timer;
