import Header from "@/partials/Header";
import React, {useState, useRef} from "react";
import {useReactToPrint} from "react-to-print";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Button} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

const CheckAttendence = () => {
  const numner_of_practicals = 10;
  return (
    <div className="h-screen gr-bg">
      <Header />
      <div className="pt-28 h-full  overflow-y-auto text-slate-100">
        <main className="flex flex-col items-center justify-center w-full flex-1  text-center">
          <table className="min-w-[800px] w-11/12 mx-auto my-8 divide-y divide-gray-200">
            <thead>
              <tr className="border">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-lg font-medium text-slate-100 uppercase tracking-wider"
                >
                  Name
                  <br />
                  <small>prn</small>
                </th>
                <th
                  scope="col"
                  colSpan={numner_of_practicals * 30}
                  className=" py-3 text-left text-xs font-medium text-slate-100 uppercase tracking-wider"
                >
                  <span className="pb-3">
                    Practical Status | Attendence | Marks
                  </span>
                  <main className="flex w-full border-t mt-3 py-3 items-center space-x-4">
                    {Array(numner_of_practicals)
                      .fill(0)
                      .map((_, i) => {
                        return (
                          <p className="px-2 w-[10%] text-center py-1 bg-slate-800 rounded-md text-slate-100 border-l">
                            P{i + 1} | A | M
                          </p>
                        );
                      })}
                  </main>
                </th>
              </tr>

              <tr className="px-6 py-3 border text-left text-xs font-medium text-slate-100 tracking-wider">
                <td className="px-6  border text-lg py-3">
                 <span
                 className="w-max flex"
                 >
                 Sushant Nirphal
                 </span>
                  <small>2019BTECS00001</small>
                </td>
                {Array(10)
                  .fill(0)
                  .map((i) => (
                    <td className="px-6 border text-lg py-3">
                      <span className="w-max text-[14px] bg-slate-800 px-2 rounded-md flex">
                        Comp <span className="bg-green-600 mx-1 px-2">P</span>{" "}
                        10
                      </span>
                    </td>
                  ))}
              </tr>
            </thead>
          </table>
        </main>
      </div>
    </div>
  );
};

export default CheckAttendence;
