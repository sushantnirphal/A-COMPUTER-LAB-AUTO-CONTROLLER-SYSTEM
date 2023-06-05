import React from "react";
import Header from "@/partials/Header";
import { StudentContext } from "../../Context/StudentContext";
import { useContext, useEffect } from "react";
import { useState } from "react";
import ReverseTimer from "@/partials/code/ReverseTimer";
import RootLayout from "@/partials/Layout";
import usePracticals from "@/hooks/usePracticals";
import formatDate from "@/utils/formatDate";
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
  const { student, setStudent } = useContext<any>(StudentContext);
  const { year, semester: sem } = student || {}
  // const [practicals, setPracticals] = useState<PracticalType[]>();

  // async function getAttendence() {
  //   const res = await fetch(
  //     `http://localhost:7890/student/prn/attendence-status/${student?.prn}`
  //   );
  //   const data = await res.json();
  //   setPracticals(data.data);
  //   console.log(data.data);
  // }

  // useEffect(() => {
  //   getAttendence();
  // }, [])
  const { fetching, practicals, refetch } = usePracticals({
    sem, year
  })

  return (
    <>
      <RootLayout>
        <main className="text-2xl md:text-6xl leading-14 p-12 text-gr bg-clip-text text-transparent font-black">
          My Attendence.
        </main>
        <div className="w-7/12 px-16  pt-8 overflow-y-auto text-slate-100">

          <main className=" ">
            <div>

              {practicals?.map((practical: any) => {
                const __pr = student.practical_completed.filter((a: PracticalType) => practical.practical_no === a.practical_no)
                const isPresent = !!__pr[0]
                const date = isPresent && (__pr[0].date)
                const marks = isPresent && __pr[0].marks
                return (
                  <div key={practical.practical_no} className=" text-slate-300 border border-dark-200 items-center bg-dark-300  px-6 py-2 rounded mb-4">
                    <h3 className="font-semibold text-sm ">
                      {practical?.practical_no})
                      Aim: {practical.aim}</h3>

                    <div className="flex  text-sm pt-2 flex-col">
                      {/* <p>Status: {practical.status}</p>
                <p>Marks: {practical.marks}</p> */}
                      <p>Attendance:

                        <span
                          className={`${isPresent ? 'text-green-500' : 'text-red-500'} font-semibold pl-2`}
                        >
                          {isPresent ? 'Present' : 'Absent'}
                        </span>

                      </p>
                      <p>Performed on:
                        <span
                          className={`${isPresent ? 'text-green-500' : 'text-red-500'} font-semibold pl-2`}
                        >
                          {date ? formatDate(date) : '--'}
                        </span>
                      </p>
                      <p>Mark:
                        <span
                          className={`${isPresent ? 'text-green-500' : 'text-red-500'} font-semibold pl-2`}
                        >
                          {marks || 0}
                        </span>
                      </p>

                    </div>
                  </div>

                )
              })}
            </div>
          </main>
        </div>
      </RootLayout>
    </>
  );
};

export default Attendence;
