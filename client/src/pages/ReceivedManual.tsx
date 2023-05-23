import React, {useEffect, useState} from "react";
import Header from "../partials/Header";
import CodeWindow from "../partials/code/CodeWindow";
import UploadManual from "../pages/UploadManual";
import Sidebarf from "../partials/code/Sidebar";
import SubmitManual from "../partials/code/SubmitManual";
import Welcome from "../partials/code/Welcome";
import {useLocation, useNavigation} from "react-router-dom";
import File_Viewer from "@/partials/File_Viewer";

const ReceivedManual = () => {
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitmanual, setManuals] = useState([]);
  const [id, setId] = useState<string | null>(null);
  const [preview, setPreview] = useState("");

  async function getManuals() {
    const req = await fetch(
      import.meta.env.VITE_SERVER_URL + "/submitmanual/all_id"
    );
    const res = await req.json();
    setManuals(res.data);
    setFetching(false);
  }
  useEffect(() => {
    getManuals();
  }, []);
  return (
    <main className=" h-screen w-full   gr-bg">
       {preview   && (
        <section className="w-screen py-8 h-screen fixed inset-0 bg-black/60 ">
          <div className="h-full overflow-auto relative mx-auto w-full">
            <span
              className="text-4xl absolute right-4 top-20 bg-red-500 grid place-items-center z-20 rounded-full w-12 h-12 text-white cursor-pointer"
              onClick={() => setPreview("")}>
              &times;
            </span>
            {preview && <File_Viewer id={preview} />}
          </div>
        </section>
      )}
      <Header />
      {/* <section className="pt-20 h-full ">
        <div className="flex-1 w-full h-full flex flex-col md:flex-row ">
          <Sidebarf setter={setId} id={id} />

          <div className="flex-1 w-full h-full flex flex-col md:flex-row ">
          {id ? (
              <SubmitManual id={id}/>
            ) : null}
          </div>
        </div>                                                                                                                                                                                                                                            
      </section> */}
         <section className="w-full pt-28 p-8 text-white md:w-1/2 min-h-full border-l">
          <h1 className="text-lg font-semibold bg-white text-sky-700 p-4 ">
            Submitted Practicals
          </h1>
          {fetching ? (
            <h6 className="py-4 text-center w-full"> Loading...</h6>
          ) : (
            <main className="py-8 space-y-6">
              {submitmanual.map(
                (item: {
                  _id: string;
                  aim: string;
                  sem: number;
                  year: number;
                  slug: string;
                  file: string;
                  file_type: string;
                }) => (
                  <div
                    key={item?._id}
                    className="flex text-slate-800 items-center bg-white/90  px-6 py-2 rounded"
                  >
                    <h4 className="text-lg w-9/12 font-semibold">{item.aim}</h4>
                    <div className="text-sm w-max shrink-0 flex space-x-2 px-5">
                      <h4>Sem {item?.sem}</h4>
                      <span>|</span>
                      <p>Year : {item?.year}</p>
                    </div>
                    <div className="ml-auto items-center flex space-x-4">
                      <button
                        className="ml-auto w-max font-semibold underline text-sky-600"
                        onClick={() => setPreview(item?._id)}
                      >
                        View Doc
                      </button>
                     
                    </div>
                  </div>
                )
              )}
            </main>
          )}
        </section>
    </main>
  );
};

export default ReceivedManual;