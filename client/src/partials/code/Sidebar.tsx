import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from "react";
import {AimType} from "../aims";
import {api} from "../aims";
import {ItemType} from "./Manual";
import {StudentContext} from "../../../Context/StudentContext";

const Sidebar: FC<{
  id: string | null;
  setter: Dispatch<SetStateAction<string | null>>;
}> = ({setter, id}) => {
  const {student} = useContext<{student: any}>(StudentContext);
  const {semester :sem, year} = student || {semester: 0, year: 0};
  console.log(year, sem);
  const [ids, setIDs] = useState([]);
  async function get_ids() {
    await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/manual/all_id/${year}/${sem}` as string
    )
      .then((d) => d.json())
      .then((e) => setIDs(e.data));
  }
  useEffect(() => {
    get_ids();
  }, [year, sem]);
  return (
    <div
      className="resize-x h-full border-r   w-40
    "
    >
      {id}
      <ul className="text-lg font-medium space-y-4 text-slate-400  p-6">
        {ids.map(({_id}, index) => (
          <li
            key={_id}
            onClick={() => {
              setter(_id);
              localStorage.setItem("open_id", _id);
            }}
            className={`hover:text-sky-100 cursor-pointer ${
              id === _id ? "text-slate-100" : "text-slate-400"
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
