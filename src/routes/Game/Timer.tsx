import { useState, useEffect } from "react";

const Timer = ({ updateTimer, questionId, targetDate, handleAnswers }: any) => {
  // console.log(targetDate);
  const [timeLeft, setTimeLeft]: any = useState(Number(targetDate));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft((prev: number) => prev - 1);
      updateTimer(questionId, timeLeft);
    }, 1000);

    if (timeLeft < 1) {
      clearTimeout(timer);
      setTimeout(() => {
        handleAnswers();
      }, 10);
    }
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(targetDate);
  }, [targetDate]);

  return (
    <h3
      style={{ color: `${timeLeft > 15 ? "white" : "red"}` }}
      className="font-medium "
    >
      {"00"}:{timeLeft > 9 ? timeLeft : "0" + (timeLeft ?? 0)}
    </h3>
  );
};

export default Timer;
