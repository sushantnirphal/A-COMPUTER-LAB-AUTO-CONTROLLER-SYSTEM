import React, {useState} from "react";
import Header from "../partials/Header";
import {api} from "../partials/aims";
import Output from "../partials/code/Output";
import CodeWindow from "../partials/code/CodeWindow";
import Manual from "../partials/code/Manual";
import Sidebar from "../partials/code/Sidebar";
import Welcome from "../partials/code/Welcome";
import {useLocation, useNavigation} from "react-router-dom";
const Code = () => {
  const [aim, setAim] = useState<string | null | number>("");
  const [code, setCode] = useState("hello world!!!");
  const [id, setId] = useState<string | null>(null);

  return (
    <main className=" h-screen w-full  gr-bg">
      <Header />
      <section className="pt-20 h-full ">
        <div className="flex-1 w-full h-full flex flex-col md:flex-row ">
          <Sidebar setter={setId} id={id} />

          <div className="flex-1 w-full h-full flex flex-col md:flex-row ">
            {id ? (
              <Manual id={id}/>
            ) : null}
            {id ? <CodeWindow code={code} setCode={setCode} /> : null}
            {!id ? <Welcome /> : null}
          </div>
          
        </div>
      </section>
    </main>
  );
};

export default Code;
