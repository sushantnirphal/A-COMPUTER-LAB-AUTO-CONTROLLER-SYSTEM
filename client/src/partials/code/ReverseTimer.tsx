import React, { useState, useEffect } from "react";

function ReverseTimer() {
  const [time, setTime] = useState(2*60*60); // 2 hours in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000); // runs every 1 second

    // clear interval after 2 hours
    setTimeout(() => {
      clearInterval(intervalId);
    },  2*60*60* 1000);

    return () => clearInterval(intervalId); // clean up
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <p>{formatTime(time)}</p>
    </div>
  );
}

export default ReverseTimer;