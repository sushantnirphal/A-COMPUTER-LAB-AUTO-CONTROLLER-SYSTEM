import React, {useState} from "react";
import Header from "../partials/Header";
import aims from "../partials/aims";
import Output from "../partials/code/Output";
import CodeWindow from "../partials/code/CodeWindow";
import Manual from "../partials/code/Manual";
import Sidebar from "../partials/code/Sidebar";
import Welcome from "../partials/code/Welcome";
const Code = () => {
  const [aim, setAim] = useState<string | null>("");
  const [code, setCode] = useState("hello world!!!");

  return (
    <main className=" h-screen  gr-bg">
      <Header />
      <section className="pt-20 h-full ">
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
