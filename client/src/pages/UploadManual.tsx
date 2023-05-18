import React, {ChangeEvent, useEffect, useState} from "react";
import Header from "@/partials/Header";
import {Link} from "react-router-dom";
import extractFormData from "@/utils/Extractform";
import FileViewer from "react-file-viewer";
import {toast} from "react-toastify";
import File_Viewer from "@/partials/File_Viewer";
const UploadManual = () => {
  const [preview, setPreview] = useState("");

  const [file, setFile] = useState<Blob>();
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitmanual, setManuals] = useState([]);
  const reader = new FileReader();
  async function getManuals() {
    const req = await fetch(
      import.meta.env.VITE_SERVER_URL + "/submitmanual/all_id"
    );
    const res = await req.json();
    setManuals(res.data);
    setFetching(false);
  }
  async function handleUpload(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      ![
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
      ].includes(file?.type || "")
    ) {
      alert("Please upload only PDF or DOCX files");
      return;
    }

    const payload: {[k: string]: string | null | number} = extractFormData(
      event.target
    );
    payload.file_type =
      file?.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ? "docx"
        : "pdf";
    if (file) {
      setLoading(true);
      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        payload.file = reader.result as string;

        const req = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/submitmanual`,
          {
            method: "post",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        const res = await req.json();
        getManuals();
        console.log("here", res);
        event.target.reset();
        // console.log(res);
        setLoading(false);
        if (!res.success) {
          alert(res.message);
        }
      };
    }

    // console.log(payload);
  }

  async function delete_manual(id: string) {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/submitmanual/delete/${id}`,
      {
        method: "post",
      }
    ).then((a) => a.json());

    toast(res.message);
    getManuals();
  }

  useEffect(() => {
    getManuals();
  }, []);
  return (
    <div className="gr-bg min-h-screen ">
      <Header />
      {preview && (
        <section className="w-screen py-8 h-screen fixed inset-0 bg-black/60 ">
          <div className="h-full overflow-auto relative mx-auto w-full">
            <span
              className="text-4xl absolute right-4 top-4 bg-red-500 grid place-items-center z-20 rounded-full w-12 h-12 text-white cursor-pointer"
              onClick={() => setPreview("")}
            >
              &times;
            </span>
            {preview && <File_Viewer id={preview} />}
          </div>
        </section>
      )}
      <main className="pt-20 flex flex-wrap h-screen">
        <section className="p-8 w-full md:w-1/2 text-white">
          <div className="p-2">
            <form className="max-w-[400px] mt-8" onSubmit={handleUpload}>
            <label htmlFor="">Name</label>
              <br />
              <input
                required
                name="name"
                type="text"
                className="border-2"
              ></input>
              <br />
              <label>PRN</label>
              <br />
              <input
                required
                name="prn"
                type="number"
                className="border-2"
              ></input>
              <br />
              <label htmlFor="">Subject</label>
              <br />
              <input
                required
                name="subject"
                type="text"
                className="border-2"
              ></input>
              <br />
              <label htmlFor="">Aim</label>
              <br />
              <input
                required
                name="aim"
                type="text"
                className="border-2"
              ></input>
              <br />
              <label className=" py-8">Upload file</label>
              <br />
              <input
                required
                name="file"
                accept=".pdf, .docx"
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
              ></input>
              
              <label>Sem</label>
              <input
                required
                name="sem"
                type="number"
                className="border-2"
              ></input>
              <button
                disabled={loading}
                className="p-2 px-6 text-white my-6 rounded-full bg-green-600"
              >
                {loading ? "Please wait..." : "Upload"}
              </button>
            </form>
          </div>
        </section>
        <section className="w-full p-8 text-white md:w-1/2 min-h-full border-l">
          <h1 className="text-lg font-semibold bg-white text-sky-700 p-4 ">
            Submitted Practical
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
                  name : string;
                  prn : number;
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
                      <button
                        onClick={() => delete_manual(item?._id)}
                        // className="bg-red-600 text- rounded-full px-6 py-2 text-sm "
                        className="ml-auto font-semibold underline text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
              )}
            </main>
          )}
        </section>
      </main>
    </div>
  );
};

export default UploadManual;
