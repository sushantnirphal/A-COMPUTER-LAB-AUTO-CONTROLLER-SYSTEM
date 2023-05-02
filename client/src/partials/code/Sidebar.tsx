import React, {Dispatch, FC, SetStateAction} from "react";
import {AimType} from "../aims";
import {api} from "../aims";
import {ItemType} from "./Manual";
const Sidebar: FC<{
  records: ItemType[];
  setAim: Dispatch<SetStateAction<string | null | number>>;
  aim: string | null | number;
}> = ({records, setAim, aim}) => {
  return (
    <div className="resize-x h-full border-r  w-64">
      <ul className="text-lg font-medium space-y-4 text-slate-400  p-6">
        {records.map(({aim, id, manual, sem, year}, index) => (
          <li
            key={id}
            onClick={() => setAim(id)}
            className={`hover:text-sky-100 cursor-pointer ${
              aim === id.toString() ? "text-slate-100" : "text-slate-400"
            }`}
          >
            Practical {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
