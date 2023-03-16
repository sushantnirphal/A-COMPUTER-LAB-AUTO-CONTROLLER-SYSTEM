import React, {FC} from "react";
import aims from "../aims";
const Manual: FC<{aim: string}> = ({aim}) => {
  return (
    <main className="flex-1 w-full h-full relative">
      <h4 className="p-6 py-4 flex-1 backdrop-filter backdrop-blur-lg bg-slate-900/40 absolute top-0 w-full text-slate-200 text-2xl font-medium border-b ">
        Aim : {aim}
      </h4>
      <div
        className="overflow-y-scroll pt-20  h-full flex-1 p-6 text-slate-200 font-mono manual-window space-y-4"
        dangerouslySetInnerHTML={{
          __html: aims.filter(({title}) => title === aim)[0].desc,
        }}
      />
    </main>
  );
};

export default Manual;
