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

const Attendence = () => {
  const numner_of_practicals = 10;
  const { student, setStudent } = useContext<any>(StudentContext);
  const { year, semester: sem } = student || {}
  const { fetching, practicals, refetch } = usePracticals({
    sem, year
  })

  return (
    <>
      <RootLayout>
        <main className="text-2xl md:text-6xl p-12  text-gr bg-clip-text text-transparent font-black">
          My Attendence.
        </main>
        <div className="w-7/12 px-16 overflow-y-auto text-slate-100">

          <main className=" ">

            <div
            className="py-4"
            >
              <p
              className="pb-3"
              >
                Marks are given based on following criteria
              </p>
              <p
              className="text-sm text-purple_pri-500"
              >
                - Manual submission : 04/10
              </p>
              <p
              className="text-sm text-purple_pri-500"
              >
                - Test case : 02/10 per passed test case
              </p>
            </div>
            <div>

              {practicals?.map((practical: any) => {
                const __pr = student.practical_completed.find((a: PracticalType) => practical.practical_no === a.practical_no)
                const isPresent = !!__pr
                const date = isPresent && (__pr.date)
                const marks = isPresent ? __pr.test_cases_passed * 2 + (__pr.manual.url ? 4 : 0) : 0
                return (
                  <div key={practical.practical_no} className=" text-slate-300 border border-dark-200 items-center bg-dark-300  px-6 py-2 rounded mb-4">
                    <h3 className="font-semibold text-sm ">
                      {practical?.practical_no})
                      Aim: {practical.aim}</h3>
                    <div className="flex  text-sm pt-2 flex-col">
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
                          {marks || 0}/10
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
