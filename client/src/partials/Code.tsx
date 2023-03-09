import React, {useState} from "react";
import Header from "./Header";
import aims from "./aims";
import Output from "./code/Output";
import CodeWindow from "./code/CodeWindow";
import Manual from "./code/Manual";
import Sidebar from "./code/Sidebar";
import Welcome from "./code/Welcome";
const Code = () => {
  const [aim, setAim] = useState<string | null>("");
  const [code, setCode] = useState("hello world!!!");

  return (
    <main className=" h-screen  gr-bg">
      <Header />
      <section className="pt-16 h-full ">
        <div className="flex-1 h-full flex flex-col md:flex-row ">
          <Sidebar aims={aims} aim={aim} setAim={setAim} />

          <div className="flex-1 h-full flex flex-col md:flex-row ">
            {aim ? <Manual aim={aim} /> : null}
            {aim ? <CodeWindow code={code} setCode={setCode} /> : null}
            {
              !aim ? <Welcome/> :null
            }
          </div>
        </div>
      </section>
    </main>
  );
};

export default Code;
