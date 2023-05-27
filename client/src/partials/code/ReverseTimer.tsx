import React, {useState, useEffect} from "react";

function ReverseTimer({
  id,
  elem,
  student,
}: {
  id: string;
  elem: HTMLDivElement | null;
  student: string;
}) {
  const initialtime = 30;
  const attendence_time = initialtime - 20;

  const [time, setTime] = useState<string | number>(initialtime); // 2 hours in seconds
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
        setTime((prevTime) => {
          if (prevTime === attendence_time) {
            alert("You can  run test cases now");
            fetch(`http://localhost:7890/student/attendence/${student}/${id}`, {
              method: "post",
            })
              .then((a) => a.json())
              .then((a) => {
                if (a.success) {
                  alert("Attendence marked");
                  setAttendence("Present");
                }
              });
            elem.requestFullscreen();
          }
          return prevTime - 1;
        });
      }, 1000); // runs every 1 second
    }

    // clear interval after 2 hours
    timeoutid = setTimeout(() => {
      clearInterval(intervalId);
      // alert("Project slot ended, You can take a break now");
      setTime(0);
    }, time * 1000);
  }
  const formatTime = (time: number) => {
    if (typeof time === "string") return time;

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  useEffect(() => {
    localStorage.setItem("project_timer_" + id, (time - 1).toString());
  }, [time]);

  useEffect(() => {
    // if (id) {
    //   const time = Number(localStorage.getItem("project_timer_" + id));
    //   if (time > 0) {
    //     start_timer();
    //     setTime(time);
    //     console.log(id, time);
    //   }
    // }
    // setStart(false);
    setTime(initialtime);
    setAttendence("");
    setStart(false);
  }, [id]);
  return (
    <div>
      <button
        onClick={start_timer}
        className=" flex content-center  text-slate-100 py-2 px-3 rounded-full"
      >

        {attendence ? attendence : null}
        {!attendence ? (start ? formatTime(time) : "Start timer") : null}

      </button>
    </div>
  );
}

export default ReverseTimer;
