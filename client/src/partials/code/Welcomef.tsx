import { FacultyContext } from "../../../Context/FacultyContex";
import React, {useContext} from "react";

const Welcomef = () => {
  const {faculty, setFaculty} = useContext(FacultyContext);
  return (
    <div className="p-6 md:p-12 h-full overflow-y-auto text-slate-100">
     
      <h5 className="text-xl text-sky-400">Hey, Good evening</h5>
      <h4 className="text-2xl md:text-4xl lg:text-6xl py-4 text-gr bg-clip-text text-transparent font-semibold">
        Welcome {faculty?.name}
      </h4>
      <p className="text-2xl">good to see you back</p>
     
    </div>
  );
};

export default Welcomef;
