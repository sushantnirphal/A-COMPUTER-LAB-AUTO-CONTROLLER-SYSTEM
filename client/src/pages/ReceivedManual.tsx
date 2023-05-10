import React, {useState} from "react";
import Header from "../partials/Header";
import {api} from "../partials/aims";
import Output from "../partials/code/Output";
import Manual from "../partials/code/Manual";
import Sidebar from "../partials/code/Sidebar";
import {useLocation, useNavigation} from "react-router-dom";

const ReceivedManual = () => {
  const [aim, setAim] = useState<string | null | number>("");
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReceivedManual;
