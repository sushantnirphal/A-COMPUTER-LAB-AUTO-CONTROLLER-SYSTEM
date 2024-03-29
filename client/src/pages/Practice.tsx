import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Output from "../../src/partials/code/Output";
import CustomInput from "../../src/partials/code/CustomInput";
import Codemirror from '@uiw/react-codemirror';
import langcode from "../../public/apicode";
import Header from "@/partials/Header";
import RootLayout from "@/partials/Layout";
const Practice: FC<{
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}> = ({ }) => {
  const [result, setResult] = useState<string | null | boolean>(false);
  const [langCode, setLangCode] = useState(0);
  const [customInput, setCustomInput] = useState("");
  const [code, setCode] = useState('')
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
    encodedParams.append("Input", `${customInput}`);

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
  
  return (
    <RootLayout>
      <section className=" p-8 h-full ">
        <div className="bg-dark-500 overflow-hidden rounded-lg">
          <div className="bg-dark-300 py-3 px-4 flex justify-between">
            <select
              name="lang"
              onChange={(e) => {
                setLangCode(Number(e.target.value || 0));
                console.log(e.target.value);
              }}
              className=" bg-transparent text-white text-xl cursor-pointer"
            >
              <option value="">Choose language</option>
              {langcode.map(({ code, label }) => {
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
          <Codemirror
            height="55vh"
            width="100%"
            value={code}
            onChange={e => setCode(e)}
            theme="dark"
            className="code-window  w-full flex-1 bg-transparent text-pink-500" />

          <CustomInput
            customInput={customInput}
            setCustomInput={setCustomInput}
          />

          <Output
            result={result === null ? "You didnt printed anything" : result}
            setResult={setResult}
          />
        </div>
      </section>
    </RootLayout>
  );
};

export default Practice;