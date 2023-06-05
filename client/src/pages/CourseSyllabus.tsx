import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import File_Viewer from "@/partials/File_Viewer";
import RootLayout from "@/partials/Layout";

const CourseSyllabus = () => {
  const [fetching, setFetching] = useState(true);
  const [syllabus, setSyllabus] = useState([]);
  const [preview, setPreview] = useState("");

  async function getSyllabus() {
    const req = await fetch(
      import.meta.env.VITE_SERVER_URL + "/syllabus/all_id"
    );
    const res = await req.json();
    setSyllabus(res.data);
    setFetching(false);
  }

  function handleDownloadAll(syllabus) {
    fetch(syllabus.file)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `syllabus_${syllabus._id}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      });
  }

  useEffect(() => {
    getSyllabus();
  }, []);

  return (
    <RootLayout>
      {preview && (
        <section className="w-screen py-8 h-screen fixed inset-0 bg-black/60 ">
          <div className="h-full overflow-auto relative mx-auto w-full">
            <span
              className="text-4xl absolute right-4 top-20 bg-red-500 grid place-items-center z-20 rounded-full w-12 h-12 text-white cursor-pointer"
              onClick={() => setPreview("")}
            >
              &times;
            </span>
            {preview && <File_Viewer id={preview} />}
          </div>
        </section>
      )}
      <section className="w-full p-8 text-white  min-h-full border-l">
        <main className="text-2xl md:text-6xl leading-14 py-8 text-gr bg-clip-text text-transparent font-black">
          List of Practical Courses & Syllabus.
        </main>
        {fetching ? (
          <h6 className="py-4 text-center w-full">Loading...</h6>
        ) : (
          <main className="py-8 space-y-6 w-6/12">
            {syllabus.map(
              (item: {
                _id: string;
                subject: string;
                sem: number;
                file: string;
              }) => (
                <div
                  key={item._id}
                  className="flex text-slate-800 bg-dark-400 rounded-lg p-4 items-center border border-dark-200"
                >
                  <h4 className="text- w-9/12 font-semibold text-white">
                    {item.subject}
                  </h4>
                  <div className="text-sm w-max shrink-0 flex space-x-2 px-5 text-white">
                    <h4>Year {item.year}</h4>
                    <span>|</span>
                    <h4>Semester {item.semester}</h4>
                  </div>
                  <div className="ml-auto items-center flex space-x-4">
                    <button
                      className="bg-green-600 rounded-full hover:bg-green-500 text-white  py-2 px-4 text-sm font-normal focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        handleDownloadAll(item);
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              )
            )}
          </main>
        )}
      </section>
    </RootLayout>
  );
};

export default CourseSyllabus;

