import React from "react";
import { classnames } from "../../utils/general";

const CustomInput = ({ customInput, setCustomInput }:{customInput:any,setCustomInput:any}) => {
  return (
    <>
      {" "}
      <textarea
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom input`}
        className={classnames(
          "focus:outline-none resize-none -top-4 relative w-full border-2 border-slate-500 z-10 rounded-md shadow-lg px-4 py-2 hover:shadow transition duration-200 bg-slate-800 text-white"
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;