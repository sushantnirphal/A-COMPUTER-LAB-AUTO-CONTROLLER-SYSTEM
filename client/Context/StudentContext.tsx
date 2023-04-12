import React, {createContext, ReactNode, useState} from "react";
import {StudentType} from "../interfaces/student";
import {FacultyType} from "../interfaces/faculty";
export const StudentContext = createContext({});
const StudentContextProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [student, setStudent] = useState<StudentType>();
  return (  
    <StudentContext.Provider value={{student, setStudent}}>
      {children}
    </StudentContext.Provider>
  );
};
export default StudentContextProvider;
