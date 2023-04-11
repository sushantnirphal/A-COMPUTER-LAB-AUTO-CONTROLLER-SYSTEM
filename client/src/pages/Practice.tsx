import React, {useState} from "react";
import Header from "../partials/Header";
import aims from "../partials/aims";
import Output from "../partials/code/Output";
import Practcode from "@/partials/code/Practcode";

const Practice = () => {
  const [aim, setAim] = useState<string | null>("");
  const [code, setCode] = useState("hello world!!!");

  return (
    <main className=" h-screen  gr-bg">
      <Header />
      <section className="pt-20 h-full ">
          <div className="flex-1 h-full flex flex-col md:flex-row ">
            {aim ? <Practcode code={code} setCode={setCode} /> : null}
          </div>
      </section>
    </main>
  );
};

export default Practice;
