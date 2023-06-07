import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import Header from "@/partials/Header";
import { Form, Link } from "react-router-dom";
import extractFormData from "@/utils/Extractform";
import { toast } from "react-toastify";
import File_Viewer from "@/partials/File_Viewer";
import RootLayout from "@/partials/Layout";
import { StudentContext, StudentContextType } from '../../Context/StudentContext'
import usePracticals, { Practical, StudentPracticalType } from "@/hooks/usePracticals";
import FileViewer from "react-file-viewer";

const UploadManual = () => {
  const { student, update_student } = useContext<any>(StudentContext) as StudentContextType;
  const { year, semester: sem } = student || []
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<Blob>();
  const [_id, set_id] = useState<string>();
  const [loading, setLoading] = useState(false);

  //  submit manual
  async function handle_manual_submit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const payload = new FormData();

    payload.append("_id", _id as any);
    payload.append("manual", file as any);

    const req = await fetch(
      `${import.meta.env.VITE_SERVER_URL_API}/student/submit-manual`,
      {
        method: "post",
        body: payload
      }
    )
    const res = await req.json();
    update_student();
    event.target.reset();
    setLoading(false);

    if (!res.success) {
      toast(res.message, {
        position: 'top-right',
        type: 'success'
      });
    }
  };


  // delete manual
  async function delete_manual(id: string) {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/submitmanual/delete/${id}`,
      {
        method: "post",
      }
    ).then((a) => a.json());

    toast(res.message);
  }

  useEffect(() => {

    window.onkeydown = (e) => {
      if (e.code === 'Escape') {
        setPreview('')
      }
    }
  }, []);
  return (
    <RootLayout>

      {preview && (
        <section tabIndex={-1} className="w-screen py-8 h-screen fixed inset-0 bg-black/60 ">
          <div className="h-full overflow-auto relative mx-auto w-full">
            <span
              className="text-3xl text-red-500  z-10 absolute top-0 right-0 cursor-pointer p-4"
              onClick={() => setPreview("")}
            >
              &times;
            </span>
            {preview && <FileViewer fileType={'pdf'} filePath={preview} />}
          </div>
        </section>
      )}
      <main className=" flex flex-wrap h-screen">
        <section className="p-8 w-full md:w-1/2 text-white">
          <div>
            <h1 className="text-xl bg-clip-text text-transparent text-gr font-semibold">
              Submit Practical.
            </h1>
            <p
              className="text-sm opacity-90"
            >
             Choose practical from dropdown and submit manual for the particular practical.
            </p>
          </div>
          <div className="p-2 text-sm bg-dark-400 rounded-lg mt-8 border border-dark-200 px-12">
            <form className="max-w-[400px] mt-8" onSubmit={handle_manual_submit}>
              {/* <label htmlFor="">Subject</label>
              
              <input
                required
                name="subject"
                type="text"
                className="border border-slate-400 mt-2"
              /> */}

              <label htmlFor="">Aim</label>
              <select
                className="border w-full mb-4 border-slate-400 py-2 px-4 rounded-lg   bg-transparent "
                name="_id"
                required
                onChange={e => set_id(e.target.value)}
              >
                <option
                  className="bg-dark-400 text-purple_pri-500"
                  value="">--Select Practical--</option>
                {
                  student?.practical_completed?.map(({ aim, _id }: { aim: string, _id: string }) =>
                    <option
                      className="bg-dark-400 text-purple_pri-500"
                      key={_id} value={_id}>
                      {aim}
                    </option>
                  )
                }
              </select>

              <label className=" py-8">Upload file</label>

              <input
                required
                name="manual"
                accept=".pdf"
                onChange={e => e.target.files && setFile(e.target.files[0])}
                type="file"
                className="accent-purple_pri-500 w-full file:py-2 file:px-4 text-xs file:bg-purple_pri-600 file:rounded-full file:text-white file:border-none border-slate-500"
              />

              <button
                disabled={loading}
                className="p-2 px-6 text-white my-6 rounded-full bg-green-600"
              >
                {loading ? "Please wait..." : "Upload"}
              </button>
            </form>
          </div>
        </section>
        <section className="w-full p-8 text-white md:w-1/2 h-full border-l border-dark-200">
          <h1 className="text-xl bg-clip-text text-transparent text-gr font-semibold">
            Practicals attended.
          </h1>
          <p
          className="text-sm opacity-90"
          >
            All attended practicals will be shown here, along with manuals submitted for particular practical.
          </p>
          <main className="py-8 h-full pr-8 overflow-auto space-y-6">
            {student?.practical_completed?.map(
              (item: StudentPracticalType) => (
                <div
                  key={item?._id}
                  className="text-white items-center border border-dark-200 bg-dark-400  px-6 pt-3 rounded-md">
                  <h4 className="text-sm font-medium">
                    0{item.practical_no})
                    {item.aim}
                  </h4>
                  <div className="text-sm  py-3 shrink-0 flex">

                    <div className="ml-auto items-center flex space-x-2">

                      <button
                        className="ml-auto text-xs   px-2 py-1 rounded-full bg-dark-200"
                      >
                        Uploaded on : {item?.manual.url ? new Date(item.manual.uploaded_on).toLocaleDateString('en-in', { dateStyle: 'full' }) : 'Yet to submit'}
                      </button>
                      {
                        item?.manual.url
                          ?
                          <button
                            className="ml-auto text-xs   px-2 py-1 rounded-full bg-purple_pri-500"
                            onClick={() => setPreview(import.meta.env.VITE_SERVER_URL_API + '/static/manual/' + item?.manual.url)}
                          >
                            View
                          </button>
                          :
                          <button
                            className="ml-auto text-xs   px-2 py-1 rounded-full bg-red-500"
                          >
                            Submission pending
                          </button>
                      }

                      {/* <button
                          onClick={() => delete_manual(item?._id)}
                          className="ml-auto text-xs   px-2 py-1 rounded-full bg-red-600"
                        >
                          Delete
                        </button> */}
                    </div>
                  </div>
                </div>
              )
            )}
          </main>

        </section>
      </main>
    </RootLayout>
  );
};

export default UploadManual;