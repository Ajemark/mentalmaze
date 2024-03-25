import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }: any) => {
  console.log(targetDate);

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft]: any = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <h3 className=" text-white">
      Ends In: {timeLeft.days}D:-{timeLeft.hours}H:-{timeLeft.minutes}M:-
      {timeLeft.seconds}S
    </h3>
  );
};

export default CountdownTimer;
