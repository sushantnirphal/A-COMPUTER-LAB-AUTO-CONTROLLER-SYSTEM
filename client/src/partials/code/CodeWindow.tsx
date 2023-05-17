import React, {Dispatch, FC, SetStateAction, useState} from "react";
import Output from "./Output";
import CustomInput from "./CustomInput";
import Codemirror from '@uiw/react-codemirror';
import langcode from "../../../public/apicode";
import ReverseTimer from "../../partials/code/ReverseTimer";
import UploadPracticals from "@/pages/UploadPracticals";
import TestCasesF from "./TestCasesF";


const CodeWindow: FC<{
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}> = ({code, setCode}) => {
  const [result, setResult] = useState<string | null | boolean>(false);
  const [langCode, setLangCode] = useState(5);
  const [customInput, setCustomInput] = useState("");
  const [input, setInput] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');

  
  const handleCheckTests = () => {
     
    console.log(expectedOutput, result);

    if ( customInput === input && result === expectedOutput) {
      console.log("Passed");
    }else{
      console.log("Not Passed");
    }
    
    
  };
  
  const [manual, setManual] = useState<{
    file: string;
    aim: string;
    file_type: string;
    testcases: string;
  } | null>(null);
  async function get_by_id() {
    setManual(null);
    await fetch(`${import.meta.env.VITE_SERVER_URL}/manual/${id}` as string)
      .then((d) => d.json())
      .then((e) => setManual(e.data));
  }
  
// funtion runTestCases(){
  


//   }


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
    encodedParams.append("LanguageChoice", `${langCode}`);+
    
    encodedParams.append("Program", `${code}`);
    encodedParams.append("Input",`${customInput}`);
    
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
            setLangCode(Number(e.target.value || 0) );
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
        <div className="bg-amber-400 flex content-center  text-slate-100 py-2 px-3 rounded-full">Timer-<ReverseTimer/></div>
        <div className="space-x-4 px-4">
          <button
            onClick={runCode}
            className="bg-green-500 text-slate-100 py-2 px-4 rounded-full"
          >
            Run
          </button>

          <button
            onClick={() => setCode("")}
            className="bg-red-500 text-slate-200 py-2 px-3 rounded-full"
          >
            Reset code
          </button>
        </div>
      </div>
      <Codemirror
        height="55vh"
        width="77vh"
        value={code}
        onChange={setCode}
        theme="light"
        className="code-window  w-full flex-1 bg-transparent text-pink-500"/>
        <CustomInput
          customInput={customInput}
          setCustomInput={setCustomInput}
        />
        <button onClick={handleCheckTests}>Check Tests</button>
       
      <Output
        result={result === null ? "You did'nt print anything" : result}
        setResult={setResult}
      />
      <div>
      
      </div>
    </div>
  );
};

export default CodeWindow;
