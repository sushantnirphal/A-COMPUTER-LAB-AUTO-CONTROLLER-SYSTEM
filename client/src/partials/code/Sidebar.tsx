import React, {Dispatch, FC, SetStateAction} from "react";
import {AimType} from "../aims";

const Sidebar: FC<{
  aims: AimType[];
  setAim: Dispatch<SetStateAction<string | null>>;
  aim: string | null;
}> = ({aims, setAim, aim}) => {
  return (
    <div className="resize-x h-full border-r  w-64">
      <ul className="text-lg font-medium space-y-4 text-slate-400  p-6">
        {aims.map(({title}, index) => (
          <li
            key={title}
            onClick={() => setAim(title)}
            className={`hover:text-sky-100 cursor-pointer ${
              title === aim ? "text-slate-100" : "text-slate-400"
            }`}
          >
           Practical  {index + 1} 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
