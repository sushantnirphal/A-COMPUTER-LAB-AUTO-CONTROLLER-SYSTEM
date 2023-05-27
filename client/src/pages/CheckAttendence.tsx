import Header from "@/partials/Header";
import React, {useState, useRef, useEffect, useContext} from "react";
import {useReactToPrint} from "react-to-print";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Button} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {StudentContext} from "../../Context/StudentContext";

interface PracticalType {
  aim: string;
  pid: string;
  status: "not-completed" | "completed";
  practical_no: number;
  marks: number;
  test_cases_passed: number;
  attendence_status: "absent" | "present";
}

const CheckAttendence = () => {

  const numner_of_practicals = 10;

  const [Attendence, setAttendence] = useState<any[]>([]);        
  const {student, setStudent} = useContext<any>(StudentContext);

  async function getAttendence() {
    const res = await fetch(
      `http://localhost:7890/faculty/get-attendance/${student?.year}/${student?.semester}`
    );
    const data = await res.json();
    setAttendence(data.data);

    console.log(data.data);
  }

  useEffect(() => {
    getAttendence();
  }, []);

  // Array.prototype.sortPresenty = function (this: any[]) {

  //   for (let i = 0; i < this.length; ++i) {
  //     if (this[i].practical_no) {
  //       [this[this[i].practical_no - 1], this[i]] = [
  //         this[i],
  //         this[this[i].practical_no - 1],
  //       ];
  //     }
  //   }

  // };

  // }

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
                          <p
                            key={i}
                            className="px-2 w-[10%] text-center py-1 bg-slate-800 rounded-md text-slate-100 border-l"
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
                  <tr className="px-6 py-3 border text-left text-xs font-medium text-slate-100 tracking-wider">
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
                      }),
                    ]).map((i: PracticalType, index: number) => (
                      <td key={index} className="px-6 border text-lg py-3">
                        <span className="w-max text-[14px] bg-slate-800 px-2 rounded-md flex">
                          {i.status === "completed" ? "Comp." : "Incom."}{" "}
                          <span
                            className={`${
                              i.attendence_status === "present"
                                ? "bg-green-600"
                                : "bg-red-500"
                            } mx-1 px-2`}
                          >
                            {i.attendence_status === "present" ? "P" : "A"}
                          </span>{" "}
                          {i.marks}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </thead>
          </table>
        </main>
      </div>
    </div>
  );
};

export default CheckAttendence;
