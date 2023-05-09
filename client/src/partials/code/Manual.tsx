import React, {FC, useEffect, useState} from "react";
import aims from "../aims";
import FileViewer from "react-file-viewer";

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

const Manual: FC<{id: string}> = ({id}) => {
  const [manual, setManual] = useState(null);
  async function get_by_id() {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/manual/${id}` as string)
      .then((d) => d.json())
      .then((e) => setManual(e.data));
  }
  useEffect(() => {
    setManual(null);
    get_by_id();
  }, [id]);

  return (
    <main className="flex-1 w-full h-full relative">
      <h4 className="p-6 py-4 flex-1 backdrop-filter backdrop-blur-lg bg-slate-900/40 absolute top-0 w-full text-slate-200 text-2xl font-medium border-b z-20 ">
        Aim : {manual?.aim}
      </h4>
     
      <main className="w-full pt-24 overflow-auto max-h-full">
      {!manual && (
        <main className="py-4">
          <h2>Loading</h2>
        </main>
      )}
        {/* <FileViewer key={id} fileType={"pdf"} filePath={manual?.file} /> */}
        {/* <div
        className="overflow-y-scroll pt-20  h-full flex-1 p-6 text-slate-200 font-mono manual-window space-y-4"
        dangerouslySetInnerHTML={{
          __html: aims.filter(({title}) => title === aim)[0].desc,
        }}
      /> */}
      </main>
    </main>
  );
};

export default Manual;
