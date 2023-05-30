import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
  useContext,
} from "react";
import Output from "./Output";
import CustomInput from "./CustomInput";
import Codemirror from "@uiw/react-codemirror";
import langcode from "../../../public/apicode";
import ReverseTimer from "../../partials/code/ReverseTimer";
import UploadPracticals from "@/pages/UploadPracticals";
import TestCasesF from "./TestCasesF";
import {StudentContext} from "../../../Context/StudentContext";

const CodeWindow: FC<{
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  id: string;

}> = ({code, setCode, id}) => {
  const [result, setResult] = useState<string | null | boolean>("");
  const {student} = useContext(StudentContext) as {student: any};

  const [langCode, setLangCode] = useState(5);
  const [customInput, setCustomInput] = useState("");
  const [input, setInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [test_result, set_test_result] = useState<boolean[]>([]);
  const [testcases, setTestcases] = useState<{input: string; output: string}[]>(
    []
  );

  // get test cases by id
  async function get_test_cases_by_id() {
    await fetch(
      `${import.meta.env.VITE_SERVER_URL}/manual/test-cases/${id}` as string,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((d) => d.json())
      .then((e) => {
        setTestcases(e.data);
        console.log(e.data);
      });
  }

  // handle test cases
  let result_cases: boolean[] = [];
  const handleCheckTests = () => {
    const section = document.querySelector(".test-cases-section");
    if (section) {
      section?.innerHTML;
    }

    set_test_result([]);
    result_cases = [];
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

      fetch("https://code-compiler.p.rapidapi.com/v2", options)
        .then((a) => a.json())
        .then((a) => {
          result_cases.push(a.Result.trim() == testcase.output);
          let b = result_cases.map((item, index) => {
            return `<button
            className=' py-2 px-4 rounded-md mb-4 ${
              item ? "bg-green-500" : "bg-red-500"
            }'
            >test case ${index + 1} ${item ? "passed" : "failed"}<button>`;
          });
          if (section) {
            section.innerHTML = b.join("<br/> ");
          }
        });
    });
  };

  async function runCode(code: string, customInput: string, langCode: string) {
    console.log(typeof code, code);
    if (!(code && code.trim())) {
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

    const req = await fetch("https://code-compiler.p.rapidapi.com/v2", options);
    const response: {Errors: string; Result: string} = await req.json();
    setResult(response.Errors ? response.Errors : response.Result);
  }

  useEffect(() => {
    get_test_cases_by_id();

    console.log(testcases);
  }, [id]);

  useEffect(() => {
    const timeout_id = setTimeout(() => {
      localStorage.setItem(id + "_code", code);
    }, 500);

    return () => {
      clearTimeout(timeout_id);
    };
  }, [code]);

  return (
    <div className=" resize-x relative flex-1 border-l flex flex-col">
      <section className="fixed test-cases-section z-40 right-0 top-44">
        {test_result.map((item, index) => (
          <button
            onClick={() => {
              set_test_result([]);
              result_cases = [];
            }}
            key={index}
            className={`${
              item ? "bg-green-500" : "bg-red-500"
            } text-white py-2 px-4 rounded-md mb-4`}
          >
            <h1>
              Test case {index + 1}
              {item ? " passed" : " failed"}
            </h1>
          </button>
        ))}
      </section>
      <div className="bg-slate-900 py-3 px-4 flex justify-between">
        <select
          name="lang"
          onChange={(e) => {
            setLangCode(Number(e.target.value || 0));
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

        <ReverseTimer
          id={id} 
          elem={document.querySelector(".full-screen-window")}
          student={student?._id}
        />

        <button
          title="Button will be enable after 1.5 hours of starting code."
          className="bg-sky-600 text-white rounded-full px-5 py-2"
          onClick={handleCheckTests}
        >
          Check Tests
        </button>
        <div className="space-x-4 px-4">
          <button
            onClick={() => runCode(code, customInput, langCode.toString())}
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
        value={code}
        onChange={setCode}
        theme="dark"
        height="100%"
        className="code-window border bg-gray-800 border-slate-600 rounded-md overflow-hidden  w-full flex-1 bg-transparent text-slate-100"
      />
      <CustomInput customInput={customInput} setCustomInput={setCustomInput} />
      {result && (
        
        <Output result={result ? result : null} setResult={setResult} />
      )}
      <div></div>
    </div>
  );
};

export default CodeWindow;
