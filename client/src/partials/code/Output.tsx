import React, {Dispatch, FC, SetStateAction} from "react";

const Output: FC<{
  result: string;
  setResult: Dispatch<SetStateAction<string | null>>;
}> = ({result, setResult}) => {
  return (
    <>
      <div className="min-h-52 resize-y relative mt-auto text-green-500 p-6 bg-gray-900">
        <button
          onClick={() => setResult(null)}
          className="p-3 text-red-500 top-0 right-0 absolute text-2xl"
        >
          &times;
        </button>
        <code>
          <pre className="code-window text-lg">{result}</pre>
        </code>
      </div>
    </>
  );
};

export default Output;
