import React from "react";
import Header from "@/partials/Header";
import {Link} from "react-router-dom";

const UploadPracticals = () => {
  return (
    <div className="gr-bg min-h-screen ">
      <Header />
      <main className="pt-20 flex flex-wrap h-screen">
        <section className="p-8 w-full md:w-1/2 text-white">
          <div>
            <h1 className="text-lg font-semibold bg-sky-700 p-4 ">
              Upload Practical
            </h1>
          </div>
          <div className="p-2">
            <form className="max-w-[400px] mt-8">
              <label htmlFor="">Subject</label>
              <br />
              <input type="text" className="border-2"></input>
              <br />

              <label className=" py-8">Upload file</label>
              <br />
              <input type="file"></input>
              <br />

              <label>Year</label>
              <br />
              <input type="text" className="border-2"></input>

              <br />

              <label>Semister</label>
              <br />
              <input type="text" className="border-2"></input>
              <br />
              <button className="p-2 px-6 text-white my-6 rounded-lg bg-green-600">
                Upload
              </button>
            </form>
          </div>
        </section>
        <section className="w-full p-8 text-white md:w-1/2 min-h-full border-l">
          <h1 className="text-lg font-semibold bg-white text-sky-700 p-4 ">
            Uploaded Practical
          </h1>
          <main className="py-8 space-y-6">
            <div className="flex text-slate-800 items-center bg-white/90  px-6 py-2 rounded">
              <h4 className="text-lg font-semibold">Aim of practical</h4>
              <div className="text-sm flex space-x-2 px-5">
                <h4>Sem VII</h4>
                <span>|</span>
                <p>Year : 3rd</p>
              </div>
              <div className="ml-auto items-center flex space-x-4">
               
                <Link
                  className="ml-auto font-semibold underline text-sky-600"
                  to={"/pdf-page"}
                >
                  View PDF
                </Link>
                <button
                  // className="bg-red-600 text- rounded-full px-6 py-2 text-sm "
                  className="ml-auto font-semibold underline text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </main>
        </section>
      </main>
    </div>
  );
};

export default UploadPracticals;
