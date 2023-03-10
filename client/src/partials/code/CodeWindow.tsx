import React, {Dispatch, FC, SetStateAction, useState} from "react";
import Output from "./Output";

const CodeWindow: FC<{
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}> = ({code, setCode}) => {
  const [result, setResult] = useState<string | null>(null);

  function runCode() {
    setResult("Compiling, please wait...");
    if (!code.trim()) {
      return;
    }
    const encodedParams = new URLSearchParams();
    encodedParams.append("LanguageChoice", "5");
    encodedParams.append("Program", code);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "7874306081msh098c99528347d4dp1d2128jsn6c4dac996975",
        "X-RapidAPI-Host": "code-compiler.p.rapidapi.com",
      },
      body: encodedParams,
    };

    fetch("https://code-compiler.p.rapidapi.com/v2", options)
      .then((response) => response.json())
      .then((response) => {
        setResult(response.Errors ? response.Errors : response.Result);
      })
      .catch((err) => console.error(err));
  }
  return (
    <div className="resize-x  flex-1 border-r flex flex-col">
      <div className="bg-slate-900 py-3 px-4 flex justify-between">
        <select
          name="lang"
          className="w-max bg-transparent text-white text-xl cursor-pointer"
        >
          {/* <option value="c" className="text-slate-900">
            C
          </option>
          <option value="js" className="text-slate-900">
            Javascript
          </option> */}
          <option value="python" className="text-slate-900">
            Python
          </option>
        </select>
        <div className="space-x-4 px-4">
          <button
            onClick={runCode}
            className="bg-green-500 text-slate-100 py-2 px-6 rounded-full"
          >
            Run
          </button>
          <button
            onClick={() => setCode("")}
            className="bg-red-500 text-slate-200 py-2 px-6 rounded-full"
          >
            Reset code
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        name="code"
        className="code-window text-xl w-full flex-1 bg-transparent p-6 text-pink-500"
      ></textarea>
      {result ? <Output result={result} setResult={setResult} /> : null}
    </div>
  );
};

export default CodeWindow;
