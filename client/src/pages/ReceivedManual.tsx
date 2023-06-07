import React, { useContext, useEffect, useState } from "react";
import Header from "../partials/Header";
import File_Viewer from "@/partials/File_Viewer";
import JSZip from "jszip";
import RootLayout from "@/partials/Layout";
import { StudentContext } from "../../Context/StudentContext";
import FileViewer from 'react-file-viewer'
import { Practical } from "@/hooks/usePracticals";
const ReceivedManual = () => {
  const [fetching, setFetching] = useState(true);
  const [manual, setManuals] = useState([]);
  const [preview, setPreview] = useState("");
  const [students, setStudents] = useState([]);

  const [selectedManuals, setSelectedManuals] = useState<{ _id: string }[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<{
    _id: string, practical_completed: any[],
    name: string;
    semester: number;
    year: number;
    file: string,
    prn: string
  } | null>(null);

  const { student, setStudent } = useContext<any>(StudentContext);
  const { semester, year } = student || {}
  async function getManuals() {
    const req = await fetch(
      import.meta.env.VITE_SERVER_URL + "/submitmanual/all_id"
    );
    const res = await req.json();
    setManuals(res.data);
    setFetching(false);
  }
  async function getStudents() {
    const req = await fetch(
      import.meta.env.VITE_SERVER_URL_API + `/student/${year}/${semester}`
    );
    const res = await req.json();
    setStudents(res);
    setFetching(false);
  }

  function handleDownloadAll() {
    const promises = selectedManuals.map(async (manual: any) => {
      const response = await fetch(manual.file);
      const blob = await response.blob();
      return blob;
    });

    Promise.all(promises)
      .then((blobs) => {
        const zip = new JSZip();
        blobs.forEach((blob, index) => {
          const fileName = `manual_${index + 1}.pdf`; // Modify the filename format if needed
          zip.file(fileName, blob);
        });

        zip.generateAsync({ type: "blob" }).then((content) => {
          const url = URL.createObjectURL(content);
          const link = document.createElement("a");
          link.href = url;
          link.download = "all_manuals.zip";
          link.click();
          URL.revokeObjectURL(url);
        });
      })
      .catch((error) => {
        console.error("Error downloading manuals:", error);
      });
  }

  useEffect(() => {
    year && semester && getManuals();
    year && semester && getStudents();
  }, []);

  return (
    <RootLayout>
      {preview && (
        <section className="w-screen py-8 h-screen fixed inset-0 backdrop-filter backdrop-blur-md bg-black/60 ">
          <div className="h-full overflow-auto relative mx-auto w-full">
            <div className="h-full overflow-auto relative mx-auto w-full">
              <span
                className="text-4xl z-10 absolute top-0 right-4 cursor-pointer text-red-500"
                onClick={() => setPreview("")}
              >
                &times;
              </span>
              {preview && <FileViewer fileType='pdf' filePath={preview} />}
            </div>
          </div>
        </section>
      )}
      <div
        className="flex h-full"
      >
        <section
          className="p-8 text-white md:w-2/5 border-r border-dark-200 h-full"
        >
          <main className="text-2xl md:text-3xl leading-14 text-gr bg-clip-text text-transparent font-black">
            All students.
          </main>
          {fetching ? (
            <h6 className="py-4 text-center w-full"> Loading...</h6>
          ) : (
            <main className="py-8 space-y-6">
              {students.map((item: {
                _id: string;
                name: string;
                semester: number;
                year: number;
                file: string,
                prn: string
              }) => (

                <div
                  key={item?._id}
                  onClick={() => setSelectedStudent(item as any)}
                  className="text-white cursor-pointer items-center border border-dark-200 bg-dark-400  px-6 pt-3 rounded-md">
                  <h4 className="text-sm font-medium ">PRN: {item.prn}</h4>
                  <h4 className="text-sm pt-2">Name: {item.name}</h4>
                  <div className="text-sm  py-3 shrink-0 flex">
                    <div
                      className="flex  text-xs space-x-2"
                    >
                      <h4>Sem {item?.semester}</h4>
                      <span>|</span>
                      <p>Year : {item?.year || 'NAN'}</p>
                    </div>
                    <div className="ml-auto items-center flex space-x-4">

                    </div>
                  </div>

                </div>
              ))}
            </main>
          )}
        </section>
        <section className="md:w-3/5 p-8 text-white">
          <div className="flex">

            <main className="text-2xl md:text-3xl leading-14 text-gr bg-clip-text text-transparent font-black">
              Submitted manuals.
            </main>

          </div>
          {
            !selectedStudent &&
            <main className="w-full py-12 leading-14 text-slate-100">
              Click on student in order to view manuals submitted by individual.
            </main>
          }
          {fetching ? (
            <h6 className="py-4 text-center w-full"> Loading...</h6>
          ) : (
            <main className="py-8 space-y-6">
              <h3
                className="underline capitalize"
              >
                {selectedStudent?.name}
              </h3>
              {selectedStudent && selectedStudent.practical_completed.map((item: Practical) => (

                <div
                  key={item?._id}
                  className="text-white items-center border border-dark-200 bg-dark-400  flex px-6 py-3 rounded-md">
                  <h4 className="text-sm font-medium">
                    0{item?.practical_no}) {' '}
                    {item.aim}
                  </h4>
                  {
                    item?.manual.url
                      ?
                      <button
                        className="ml-auto text-xs   px-2 py-1 rounded-full bg-purple_pri-500"
                        onClick={() => setPreview(import.meta.env.VITE_SERVER_URL_API + '/static/manual/' + item?.manual.url)}
                      >
                        View
                      </button>
                      : <button
                        className="ml-auto text-xs   px-2 py-1 rounded-full bg-red-600"
                        
                      >
                        Submission pending
                      </button>
                  }
                </div>
              ))}
            </main>
          )}
        </section>
      </div>
    </RootLayout>
  );
};

export default ReceivedManual;
