import React, { createContext, ReactNode, useEffect, useState } from "react";
import { StudentType } from "../interfaces/student";
import { useLocation } from "react-router-dom";

export interface StudentContextType {
  student: StudentType | any;
  setStudent: React.Dispatch<React.SetStateAction<StudentType | undefined>>;
  update_student: () => void
  update_faculty: () => void
}
export const StudentContext = createContext<StudentContextType | {}>({});


const StudentContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [student, setStudent] = useState<StudentType>();
  useEffect(() => {
    setStudent(JSON.parse(localStorage.getItem("user") as string));
    student?._id &&
      (student?.role === 'student'
        ? update_student()
        : update_faculty())
  }, []);

  function update_student() {
    if (!student?._id || student?.role === 'admin') return
    fetch(`${import.meta.env.VITE_SERVER_URL_API}/student/${student?._id}?all=true`)
      .then(a => a.json())
      .then(b => {
        setStudent(b);
        localStorage.setItem('user', JSON.stringify(b))
      })
  }
  function update_faculty() {
    if (!student?._id || student?.role === 'admin') return
    fetch(`${import.meta.env.VITE_SERVER_URL_API}/faculty/me/${student?._id}`)
      .then(a => a.json())
      .then(b => {
        setStudent(b.data);
        localStorage.setItem('user', JSON.stringify(b.data))
      })
  }
  return (
    <StudentContext.Provider value={{ student, setStudent, update_student, update_faculty }}>
      {children}
    </StudentContext.Provider>
  );
};
export default StudentContextProvider;
