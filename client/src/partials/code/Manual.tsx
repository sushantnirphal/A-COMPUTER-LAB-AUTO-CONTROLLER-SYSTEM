import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import aims from "../aims";
import Welcome from "./Welcome";
import FileViewer from "react-file-viewer";
import { HiArrowLeft } from "react-icons/hi";

export interface ItemType {
  aim: string | number;
  manual: {
    size: number;
    name: string;
    url: string;
    type: string;
  };
  year: number;
  sem: number;
  id: number;
}

const Manual: FC<{ id: string, setter: Dispatch<SetStateAction<string | null>> }> = ({ id, setter }) => {
  const [manual, setManual] = useState<{
    file: string;
    aim: string;
    file_type: string;
  } | null>(null);
  async function get_by_id() {
    setManual(null);
    await fetch(`${import.meta.env.VITE_SERVER_URL}/manual/${id}` as string)
      .then((d) => d.json())
      .then((e) => setManual(e.data));
  }
  useEffect(() => {
    setManual(null);
    get_by_id();
  }, [id]);

  return (
    <main className="flex-1 w-1/2 h-full relative">


      <h4 className="p-6 py-4 flex items-center backdrop-filter backdrop-blur-lg bg-dark-400 absolute top-0 w-full text-slate-200 text-sm font-medium border-b border-dark-200 z-20 ">
        <span
          onClick={() => setter('')}
          className="text-white cursor-pointer bg-dark-200 px-2 py-1 rounded-full mr-4"
        >
          <HiArrowLeft className="" />
        </span>
        Aim : {manual?.aim || 'Loading...'}
      </h4>


      <main className="w-full pt-12 overflow-auto max-h-full">
        {!manual && (
          <main className="py-4 text-white px-6 ">
            <h2>Loading...</h2>
          </main>
        )}
        {manual ? (
          <FileViewer
            key={id}
            fileType={manual?.file_type || "pdf"}
            filePath={manual?.file || ""}
          />
        ) : null}
      </main>
    </main>
  );
};

export default Manual;
