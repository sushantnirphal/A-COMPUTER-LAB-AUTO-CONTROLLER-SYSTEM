import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Header from "@/partials/Header";
import { Link } from "react-router-dom";
import extractFormData from "@/utils/Extractform";
import { ToastContainer, toast } from "react-toastify";
import File_Viewer from "@/partials/File_Viewer";
import TestCasesF from "@/partials/code/TestCasesF";
import { StudentContext } from "../../Context/StudentContext";
import RootLayout from "@/partials/Layout";
//import TestCasesF from "@/partials/code/TestCasesF";
const UploadPracticals = ({ onSaveTestCases }: { onSaveTestCases: any }) => {
  const [preview, setPreview] = useState("");

  const [file, setFile] = useState<Blob>();
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [manual, setManuals] = useState([]);
  const { student, setStudent } = useContext<any>(StudentContext);
  const reader = new FileReader();


  const [input, setInput] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');


  async function getManuals() {
    const req = await fetch(`http://localhost:7890/api/manual/all_id/${student?.year}/${student?.semester}`);
    const res = await req.json();
    setManuals(res.data);
    setFetching(false);
    toast('Practical fetched.', { type: 'success', position: 'bottom-left' })
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
    const formdata = new FormData(event.target)

    const test_case: { input: string | number, output: string }[] = [];
    const inputs = formdata.getAll('test_case_input');
    const outputs = formdata.getAll('test_case_output');
    for (const i in inputs) {
      test_case[i] = {
        input: inputs[i] as string,
        output: outputs[i] as string,
      }
    }

    const payload: { [k: string]: string | null | number } = extractFormData(
      event.target
    );
    payload.test_case = test_case as any
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
    
        const req = await fetch(`${import.meta.env.VITE_SERVER_URL}/manual`, {
          method: "post",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(payload),
        });
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
      `${import.meta.env.VITE_SERVER_URL}/manual/delete/${id}`,
      {
        method: "post",
      }
    ).then((a) => a.json());

    toast('Practical deleted successfully', { position: 'top-right', type: 'success' });
    getManuals();
  }

  useEffect(() => {
    student?.year && getManuals();

    window.onkeydown = (e) => {
      if (e.code === 'Escape') {
        setPreview('')
      }
    }
  }, []);
  return (
    <RootLayout>
      {preview && (
        <section className=" py-8 h-screen fixed inset-0 bg-black/60 ">
          <div className="h-full overflow-auto relative mx-auto w-full">
            <span
              className="text-3xl text-red-500 absolute top-0 right-0 cursor-pointer p-4"
              onClick={() => setPreview("")}
            >
              &times;
            </span>
            {preview && <File_Viewer id={preview} />}
          </div>
        </section>
      )}
      <main className="flex flex-wrap h-screen">
        <section className="p-8 w-1/2 md:w-1/2 h-full overflow-y-scroll border-l border-dark-200 text-white">
          <div>
            <main className="text-2xl md:text-3xl leading-14 text-gr bg-clip-text text-transparent font-black">
              Upload practicals.
            </main>
          </div>
          <div className="p-2">
            <form className="max-w-[400px] mt-8" onSubmit={handleUpload}>
              <label htmlFor="">Subject</label>
              <br />
              <input
                required
                name="subject"
                type="text"
                className="border border-slate-500"
              />
              <br />
              <label htmlFor="">Aim</label>
              <br />
              <input
                required
                name="aim"
                type="text"
                className="border border-slate-500"
              />
              <br />
              <label className=" py-8">
                Uplaod manual.
              </label>
              <br />
              <input
                required
                name="file"
                accept=".pdf, .docx"
                onChange={(e) => {
                  if (e.target.files)
                    setFile(e.target.files[0])
                }}
                type="file"
                className="accent-purple_pri-500 file:py-2 file:px-4 text-xs file:bg-purple_pri-600 file:rounded-full file:text-white file:border-none border-slate-500"
              />
              <br />
              <label htmlFor="">
                Practical number.
              </label>
              <br />
              <input
                required
                name="practical_no"
                type="number"
                className="border border-slate-500"
              />
              <input
                name="year"
                required
                value={student?.year}
                type="hidden"
                className="border border-slate-500"
              />

              <input
                required
                name="semester"
                type="hidden"
                value={student?.semester}
                className="border border-slate-500"
              />

              <section>
                <h3>
                  Test cases
                </h3>
                <div>
                  {
                    [1, 2, 3].map(() =>
                      <main
                        className="flex text-sm mt-4 space-x-4 px-4 py-2 bg-dark-400 rounded-lg"
                      >
                        <article>
                          <label htmlFor="">
                            Input
                          </label>
                          <br />
                          <input
                            required
                            name="test_case_input"
                            type="string"
                            className="border border-slate-500"
                          />
                        </article>
                        <article>
                          <label htmlFor="">
                            Expected output.
                          </label>
                          <br />
                          <input
                            required
                            name="test_case_output"
                            type="string"
                            className="border accent-purple_pri-500 border-slate-500"
                          />
                        </article>
                      </main>
                    )
                  }
                </div>
              </section>
              <button
                disabled={loading}
                className="p-2 px-6 text-white my-6 rounded-full bg-purple_pri-500"
              >
                {loading ? "Please wait..." : "Upload"}
              </button>
            </form>
          </div>
        </section>

        <section className="w-1/2  p-8 text-white md:w-1/2 h-full overflow-y-scroll border-l border-dark-200">
          <main className="text-2xl md:text-3xl leading-14 text-gr bg-clip-text text-transparent font-black">
            Uploaded practicals.
          </main>
          {fetching ? (
            <h6 className="py-4 text-center w-full"> Loading...</h6>
          ) : (
            <main className="py-8 space-y-6">
              {manual && manual.map(
                (item: {
                  _id: string;
                  aim: string;
                  semester: number;
                  year: number;
                  slug: string;
                  file: string;
                  file_type: string;
                  practical_no:number
                }) => (
                  <div
                    key={item?._id}
                    className="text-white items-center border border-dark-200 bg-dark-400  px-6 pt-3 rounded-md">
                    <h4 className="text-sm font-medium"> { item.practical_no} ) {item.aim}</h4>
                    <div className="text-sm  py-3 shrink-0 flex">
                      <div
                        className="flex space-x-2"
                      >
                        <h4>Semester {item?.semester}</h4>
                        <span>|</span>
                        <p>Year : {item?.year || 'NAN'}</p>
                      </div>
                      <div className="ml-auto items-center flex space-x-4">
                        <button
                          className="ml-auto text-xs   px-2 py-1 rounded-full bg-purple_pri-500"
                          onClick={() => setPreview(item?._id)}
                        >
                          View Doc
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure to delete ?')) {
                              delete_manual(item?._id)
                            }
                          }}
                          className="ml-auto text-xs   px-2 py-1 rounded-full bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                  </div>
                )
              )}
            </main>
          )}
        </section>
      </main>
    </RootLayout>
  );
};

export default UploadPracticals;