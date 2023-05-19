import React, {useState} from "react";
import Header from "@/partials/Header";
function Settime({onSet}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const duration = hours * 3600 + minutes * 60 + seconds;
    onSet(duration);
  };
  return (
    <>
      <div className=" gr-bg min-h-screen w-full">
        <Header />
        <div className="p-12 md:p-32 h-full  overflow-y-auto text-slate-100">
          <div>
            <form onSubmit={handleSubmit} className="max-w-[400px] ">
              <h1 className="text-2xl font-bold mb-2">Set Timer</h1>

              <div className="flex items-center mb-4">
                <label htmlFor="hours" className="mr-2">
                  Hours:
                </label>
                <input
                  type="number"
                  id="hours"
                  className="border border-gray-300 px-2 py-1"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="minutes" className="mr-2">
                  Minutes:
                </label>
                <input
                  type="number"
                  id="minutes"
                  className="border border-gray-300 px-2 py-1"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                />
              </div>

              <div className="flex items-center mb-4">
                <label htmlFor="seconds" className="mr-2">
                  Seconds:
                </label>
                <input
                  type="number"
                  id="seconds"
                  className="border border-gray-300 px-2 py-1"
                  value={seconds}
                  onChange={(e) => setSeconds(Number(e.target.value))}
                />
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                Set Timer
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settime;

// import React, { useState } from 'react';

// const SetTimer = ({ onSet }) => {
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const duration = hours * 3600 + minutes * 60 + seconds;
//     onSet(duration);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-2">Set Timer</h1>

//       <div className="flex items-center mb-4">
//         <label htmlFor="hours" className="mr-2">Hours:</label>
//         <input
//           type="number"
//           id="hours"
//           className="border border-gray-300 px-2 py-1"
//           value={hours}
//           onChange={(e) => setHours(Number(e.target.value))}
//         />
//       </div>

//       <div className="flex items-center mb-4">
//         <label htmlFor="minutes" className="mr-2">Minutes:</label>
//         <input
//           type="number"
//           id="minutes"
//           className="border border-gray-300 px-2 py-1"
//           value={minutes}
//           onChange={(e) => setMinutes(Number(e.target.value))}
//         />
//       </div>

//       <div className="flex items-center mb-4">
//         <label htmlFor="seconds" className="mr-2">Seconds:</label>
//         <input
//           type="number"
//           id="seconds"
//           className="border border-gray-300 px-2 py-1"
//           value={seconds}
//           onChange={(e) => setSeconds(Number(e.target.value))}
//         />
//       </div>

//       <button className="bg-blue-500 hover:bg-blue-700 text-white font
// -bold py-2 px-4 rounded">
// Set Timer
// </button>
// </form>
// );
// };

// export default SetTimer;
