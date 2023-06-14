import Header from "@/partials/Header";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../Context/StudentContext";
import RootLayout from "@/partials/Layout";
import { toast } from "react-toastify";

interface PracticalType {
  aim: string;
  pid: string;
  status: "not-completed" | "completed";
  practical_no: number;
  manual : any,
  marks: number;
  test_cases_passed: number;
  attendence_status: "absent" | "present";
  date: ''
}

const CheckAttendence = () => {

  const numner_of_practicals = 10;

  const [Attendence, setAttendence] = useState<any[]>([]);
  const { student, setStudent } = useContext<any>(StudentContext);

  async function getAttendence() {
    const res = await fetch(
      `http://localhost:7890/faculty/get-attendance/${student?.year}/${student?.semester}`
    );
    const data = await res.json();
    setAttendence(data.data);
    toast('Attendence fetched successfully.', {
      type: 'success'
    })
  }

  useEffect(() => {
    getAttendence();
  }, []);

  const sortPresenty = (arr: PracticalType[]) => {
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i].practical_no) {
        [arr[arr[i].practical_no - 1], arr[i]] = [
          arr[i],
          arr[arr[i].practical_no - 1],
        ];
      }
    }
    return arr;
  };

  return (
    <RootLayout>
      <div className="overflow-y-auto w-full text-slate-100">
        <main className="flex  p-12 flex-col w-full overflow-x-auto">
          <table className=" divide-gray-200">
            <thead>
              <tr tabIndex={-1} className="border focus:bg-cyan_pri/10">
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
                          <p
                            key={i}
                            className="px-2 w-[10%] text-center py-1 bg-dark-400 rounded-md text-slate-100 border-l"
                          >
                            P{i + 1} | A | M
                          </p>
                        );
                      })}
                  </main>
                </th>
              </tr>

              {Attendence.map((student: any) => {
                return (
                  <tr tabIndex={-1} className="px-6 focus:bg-cyan_pri/10 py-3 border text-left text-xs font-medium text-slate-100 tracking-wider">
                    <td className="px-6  border text-lg py-3">
                      <span className="w-max flex">{student?.name}</span>
                      <small>{student?.prn}</small>
                    </td>
                    {sortPresenty([
                      ...student.practical_completed,
                      ...Array(
                        numner_of_practicals -
                        student.practical_completed.length
                      ).fill({
                        aim: null,
                        pid: null,
                        status: null,
                        practical_no: undefined,
                        marks: 0,
                        test_cases_passed: 0,
                        attendence_status: "absent",
                        date: ''
                      }),
                    ]).map((i: PracticalType, index: number) => {
                      const marks = i.pid ? i.test_cases_passed * 2 + (i.manual.url ? 4 : 0) : 0
                      return <td key={index} className="px-6 border text-lg py-3">
                        <span className="w-max text-[14px] bg-dark-400 px-2 rounded-md flex">
                          {i.status === "completed" ? "Comp." : "Incom."}{" "}
                          <span
                            className={`${i.attendence_status === "present"
                              ? "bg-green-600"
                              : "bg-red-500"
                              } mx-1 px-2`}
                          >
                            {i.attendence_status === "present" ? "P" : "A"}
                          </span>{" "}
                          {marks}
                        </span>
                        <p
                          className="text-xs py-2"
                        >
                          {i?.date ? new Date(i?.date).toLocaleString('en-in', { dateStyle: 'short' }) : 'Absent'}
                        </p>
                      </td>
                    }
                    )}
                  </tr>
                );
              })}
            </thead>
          </table>
        </main>
      </div>
    </RootLayout>
  );
};

export default CheckAttendence;
