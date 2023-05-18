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
<<<<<<< HEAD
  const [input, setInput] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');

  
  const handleCheckTests = () => {
     
    console.log(expectedOutput, result);
=======
  const [input, setInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [test_result, set_test_result] = useState<boolean[]>([]);
  const [testcases, setTestcases] = useState<{input: string; output: string}[]>(
    []
  );
>>>>>>> 5ae84bdb104f19e10fb4831d6de4580a6dac0500

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
<<<<<<< HEAD
      .then((e) => setManual(e.data));
=======
      .then((e) => {
        setTestcases(e.data);
        console.log(e.data);
      });
>>>>>>> 5ae84bdb104f19e10fb4831d6de4580a6dac0500
  }
  
// funtion runTestCases(){
  

<<<<<<< HEAD
=======
  // handle test cases
  const handleCheckTests = () => {
    console.log(testcases);
    set_test_result([]);
    const tests: any = [];
    testcases.forEach(async (testcase) => {
      const encodedParams = new URLSearchParams();
      encodedParams.append("LanguageChoice", `${langCode}`);
      encodedParams.append("Program", `${code}`);
      encodedParams.append("Input", `${testcase.input}`);

      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "5c77346bcdmsh42c7871be9b2910p136d8djsn050adb52544a",
          "X-RapidAPI-Host": "code-compiler.p.rapidapi.com",
        },
        body: encodedParams,
      };

      const req = await fetch(
        "https://code-compiler.p.rapidapi.com/v2",
        options
      );
      const res = await req.json();
      console.log(res.Result.trim(), testcase.output);
      set_test_result([...test_result, res.Result.trim() == testcase.output]);
    });
  };
>>>>>>> 5ae84bdb104f19e10fb4831d6de4580a6dac0500

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
<<<<<<< HEAD
    encodedParams.append("LanguageChoice", `${langCode}`);+
    
    encodedParams.append("Program", `${code}`);
    encodedParams.append("Input",`${customInput}`);
    
=======
    encodedParams.append("LanguageChoice", `${langCode}`);
    encodedParams.append("Program", `${code}`);
    encodedParams.append("Input", `${customInput}`);

>>>>>>> 5ae84bdb104f19e10fb4831d6de4580a6dac0500
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
<<<<<<< HEAD
=======

  useEffect(() => {
    get_test_cases_by_id();
    console.log(testcases);
  }, [id]);

  useEffect(() => {
    set_test_result([]);
  }, [code]);
>>>>>>> 5ae84bdb104f19e10fb4831d6de4580a6dac0500
  return (
    <div className="resize-x relative flex-1 border-r flex flex-col">
      <section className="fixed z-40 right-0 top-44">
        {test_result.map((item, index) => (
          <div
            className={`${
              item ? "bg-green-500" : "bg-red-500"
            } text-white py-2 px-4 rounded-md mb-4`}
          >
            <h1>
              test case {index + 1}
              {item ? " Passed" : " Failed"}
            </h1>
          </div>
        ))}
      </section>
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
