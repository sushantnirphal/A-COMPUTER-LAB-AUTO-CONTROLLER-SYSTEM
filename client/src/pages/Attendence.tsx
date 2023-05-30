import React from "react";
import Header from "@/partials/Header";
import {StudentContext} from "../../Context/StudentContext";
import {useContext, useEffect} from "react";
import {useState} from "react";
import ReverseTimer from "@/partials/code/ReverseTimer";

interface PracticalType {
  aim: string;
  status: "not-completed" | "completed";
  practical_no: number;
  marks: number;
  attendence_status: "absent" | "present";
}

// const sortPresenty = (arr: PracticalType[]) => {
//   for (let i = 0; i < arr.length; ++i) {
//     if (arr[i].practical_no) {
//       [arr[arr[i].practical_no - 1], arr[i]] = [
//         arr[i],
//         arr[arr[i].practical_no - 1],
//       ];
//     }
//   }
//   return arr;
// };

const Attendence = () => {
  const numner_of_practicals = 10;
  const {student, setStudent} = useContext<any>(StudentContext);
  const [practicals, setPracticals] = useState<PracticalType[]>();

  async function getAttendence() {
    const res = await fetch(
      `http://localhost:7890/student/attendence-status/${student?.prn}`
    );
    const data = await res.json();
    setPracticals(data.data);
    console.log(data.data);
  }

  useEffect(() => {
    getAttendence();
    }, [])
  return (
    <>
      <div className="h-screen gr-bg">
        <Header />
        <div className="pt-28 h-full  flex   justify-center  overflow-y-auto text-slate-100">

          <main className=" ">
         <div>
         {practicals?.map((practical: PracticalType) => {return (
                <div key={practical.practical_no} className=" text-slate-800 items-center bg-white/90  px-6 py-2 rounded mb-3">
                <h3 className="text-xl font-bold">Practical No: {practical.practical_no}</h3>
                 <p className="">Aim: {practical.aim}</p>
                 <div className="flex flex-col">
                {/* <p>Status: {practical.status}</p>
                <p>Marks: {practical.marks}</p> */}
                <p>Attendance: {practical.attendence_status}</p>
                </div>
              </div>

               )})}
          </div> 
          </main>
        </div>
      </div>
    </>
  );
};

export default Attendence;
