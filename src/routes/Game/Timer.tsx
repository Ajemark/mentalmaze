import { useState, useEffect, useContext } from "react";
import { io as webSocketClient } from "socket.io-client";
import { UserContext } from "../../context/UserContext";

const webSocketUrl = import.meta.env.VITE_REACT_APP_BASE_URL
const socket = webSocketClient(webSocketUrl);


const Timer = ({ timeRemaing, setTimeRemaing }: any) => {

  const { userDetails }: any = useContext(UserContext);


  useEffect(() => {
    // use to end game when player decide to force close game
    // socket.emit("force_end_timer", { playersAddress: userDetails.address });
    socket.emit("start_timer", { playersAddress: userDetails.address });
    socket.on("updateTimer", (_timeRemaining) => {
      setTimeRemaing(() => _timeRemaining);
      console.log("yeah");
    });

    socket.on("updateTimer", (_timeRemaining) => {
      setTimeRemaing(() => _timeRemaining);
      console.log("yeah");
    });

    socket.on("timerEnd", () => {

    });
  }, []);

  return (
    <div></div>
  );
};

export default Timer;
