import React, {createContext, ReactNode, useEffect, useState} from "react";
import {FacultyType} from "../interfaces/faculty";

  export const FacultyContext = createContext({});
  const FacultyContextProvider: React.FC<{children: ReactNode}> = ({
    children,
  }) => {
    const [faculty, setFaculty] = useState<FacultyType>();
    return (  
      <FacultyContext.Provider value={{faculty, setFaculty}}>
        {children}
      </FacultyContext.Provider>
    );
  };
  export default FacultyContextProvider;  

  