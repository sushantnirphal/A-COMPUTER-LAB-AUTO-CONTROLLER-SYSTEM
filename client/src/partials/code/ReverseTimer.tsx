import React, { useState, useEffect } from "react";
import { HiClock } from "react-icons/hi";
import { toast } from "react-toastify";

function ReverseTimer({
  id,
  elem,
  student,
  update_student,
  toast
}: {
  id: string;
  elem: HTMLDivElement | null;
  student: string;
  update_student: () => void;
  toast: any
}) {
  const initialtime = 20;
  const attendence_time = initialtime - 10;

  const [time, setTime] = useState<number>(initialtime); // 2 hours in seconds
  const [start, setStart] = useState(false);
  const [attendence, setAttendence] = useState(""); // 2 hours in seconds
  let intervalId: any;
  let timeoutid: any;
  useEffect(() => {
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutid);
    }; // clean up
  }, []);

  function start_timer() {
    setStart(true);
    if (elem) {
      elem.requestFullscreen();
      intervalId = setInterval(() => {
        setTime((prevTime: any) => {
          if (prevTime === attendence_time) {
            alert("You can  run test cases now");
            fetch(`http://localhost:7890/student/attendence/${student}/${id}`, {
              method: "post",
            })
              .then((a) => a.json())
              .then((a) => {
                if (a.success) {
                  alert("Attendence marked.");
                  setAttendence("Present");
                  update_student()
                }
              });
          }
          return (prevTime - 1);
        });
      }, 1000); // runs every 1 second
    }

    // clear interval after 2 hours
    timeoutid = setTimeout(() => {
      clearInterval(intervalId);
      setTime(0);
    }, time * 1000);
  }
  const formatTime = (time: number) => {
    if (typeof time === "string") return time;

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
      }${seconds}`;
  };

  useEffect(() => {
    localStorage.setItem("project_timer_" + id, (time - 1).toString());
  }, [time]);

  useEffect(() => {
    setTime(initialtime);
    setAttendence("");
    setStart(false);
  }, [id]);
  return (
    <div>
      <button
        onClick={start_timer}
        className="flex content-center bg-dark-200 shadow-xl text-slate-200 py-2 px-3 rounded-full"
      >
        {attendence ? attendence : null}
        {!attendence
          ?
          (start ? formatTime(time)
            : <span
              className="flex space-x-2 items-center"
            >
              <HiClock />
              <p>
                Start timer
              </p>
            </span>

          ) : null}
      </button>
    </div>
  );
}

export default ReverseTimer;
