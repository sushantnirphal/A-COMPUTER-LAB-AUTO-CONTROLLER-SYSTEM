import React, {Dispatch, FC, SetStateAction, useState} from "react";
import Output from "./Output";
import langcode from "../../../public/apicode";
const CodeWindow: FC<{
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}> = ({code, setCode}) => {
  const [result, setResult] = useState<string | null | boolean>(false);
  const [langCode, setLangCode] = useState(0);
  function runCode() {
    if (!code.trim()) {
      alert("Empty code is not allowed");
      return;
    }
    if (!langCode) {
      alert("Please choose language");
      return;
    }
    setResult("Compiling, please wait...");
    const encodedParams = new URLSearchParams();
    encodedParams.append("LanguageChoice", `${langCode}`);
    encodedParams.append("Program", `${code}`);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "5c77346bcdmsh42c7871be9b2910p136d8djsn050adb52544a",
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
  //   {
  //     "Errors": null,
  //     "Result": null,
  //     "Stats": "No Status Available",
  //     "Files": null
  // }
  return (
    <div className="resize-x  flex-1 border-r flex flex-col">
      <div className="bg-slate-900 py-3 px-4 flex justify-between">
        <select
          name="lang"
          onChange={(e) => {
            setLangCode(e.target.value);
            console.log(e.target.value);
          }}
          className="w-max bg-transparent text-white text-xl cursor-pointer"
        >
          {/* <option value="c" className="text-slate-900">
            C
          </option>
          <option value="js" className="text-slate-900">
            Javascript
          </option> */}
          {langcode.map(({code, label}) => {
            return (
              <option key={label} value={code} className="text-slate-900">
                {label}
              </option>
            );
          })}
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
      <Output
        result={result === null ? "You didnt printed anything" : result}
        setResult={setResult}
      />
    </div>
  );
};

export default CodeWindow;
