import React, {useState} from "react";
import Header from "../partials/Header";
import CodeWindow from "../partials/code/CodeWindow";
import UploadManual from "../pages/UploadManual";
import Sidebarf from "../partials/code/Sidebar";
import SubmitManual from "../partials/code/SubmitManual";
import Welcome from "../partials/code/Welcome";
import {useLocation, useNavigation} from "react-router-dom";

const ReceivedManual = () => {
  const [id, setId] = useState<string | null>(null);

  return (
    <main className=" h-screen w-full  gr-bg">
      <Header />
      <section className="pt-20 h-full ">
        <div className="flex-1 w-full h-full flex flex-col md:flex-row ">
          <Sidebarf setter={setId} id={id} />

          <div className="flex-1 w-full h-full flex flex-col md:flex-row ">
          {id ? (
              <SubmitManual id={id}/>
            ) : null}
          </div>
        </div>                                                                                                                                                                                                                                            
      </section>
    </main>
  );
};

export default ReceivedManual;
