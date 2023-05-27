import React, {createContext, ReactNode, useEffect, useState} from "react";
import {StudentType} from "../interfaces/student";
import {useLocation} from "react-router-dom";
export const StudentContext: any = createContext<
  | {
      student: StudentType | undefined;
      setStudent: React.Dispatch<React.SetStateAction<StudentType | undefined>>;
    }
  | {}
>({});
const StudentContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [student, setStudent] = useState<StudentType>();
  useEffect(() => {
    setStudent(JSON.parse(localStorage.getItem("user") as string));
  }, []);
  return (
    <StudentContext.Provider value={{student, setStudent}}>
      {children}
    </StudentContext.Provider>
  );
};
export default StudentContextProvider;
