import React, {Dispatch, FC, SetStateAction} from "react";

const Output: FC<{
  result: string |true | null;
  setResult: Dispatch<SetStateAction<string | boolean | null>>;
}> = ({result, setResult}) => {
  return (
    <>
      <div className="min-h-52 font-mono font-medium resize-y relative mt-auto text-green-400 rounded-md overflow-hidden border border-slate-400 p-6 bg-gray-900">
        <button
          onClick={() => setResult(null)}
          className="p-3 text-red-500 top-0 right-0 absolute text-2xl"
        >
          &times;
        </button>
        <code>
          <pre className="code-window text-sm">{result}</pre>
        </code>
      </div>
    </>
  );
};

export default Output;
