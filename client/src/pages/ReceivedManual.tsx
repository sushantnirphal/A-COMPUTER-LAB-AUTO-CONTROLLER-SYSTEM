import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import File_Viewer from "@/partials/File_Viewer";
import JSZip from "jszip";

const ReceivedManual = () => {
  const [fetching, setFetching] = useState(true);
  const [manual, setManuals] = useState([]);
  const [preview, setPreview] = useState("");
  const [selectedManuals, setSelectedManuals] = useState<{ _id: string }[]>([]);


  async function getManuals() {
    const req = await fetch(
      import.meta.env.VITE_SERVER_URL + "/submitmanual/all_id"
    );
    const res = await req.json();
    setManuals(res.data);
    setFetching(false);
  }

  function handleDownloadAll() {
    const promises = selectedManuals.map(async (manual) => {
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
    getManuals();
  }, []);

  return (
    <main className="h-screen w-full gr-bg">
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
      <Header />
      <section className="w-full pt-28 p-8 text-white md:w-1/2 min-h-full border-l">
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleDownloadAll}
            disabled={selectedManuals.length === 0}
          >
            Generate Report
          </button>
        </div>
        <h1 className="text-lg font-semibold bg-white text-sky-700 p-4">
          Submitted Practicals
        </h1>
        {fetching ? (
          <h6 className="py-4 text-center w-full"> Loading...</h6>
        ) : (
          <main className="py-8 space-y-6">
          {manual.map((item:{
           _id: string;
           aim: string;
           sem: number;
           year: number;
           file: string
  }) => (
    <div
      key={item._id} // Make sure `item._id` is the correct property name
      className="flex text-slate-800 items-center bg-white/90 px-6 py-2 rounded"
    >
      <h4 className="text-lg w-9/12 font-semibold">{item.aim}</h4>
      <div className="text-sm w-max shrink-0 flex space-x-2 px-5">
        <h4>Sem {item.sem}</h4>
        <span>|</span>
        <p>Year: {item.year}</p>
      </div>
      <div className="ml-auto items-center flex space-x-4">
        <button
          className="ml-auto w-max font-semibold underline text-sky-600"
          onClick={() => setPreview(item._id)} // Make sure `item._id` is the correct property name
        >
          View Doc
        </button>
        
        <input
      type="checkbox"
     checked={selectedManuals.some((manual) => manual._id === item._id)}
     onChange={() => {
    if (selectedManuals.some((manual) => manual._id === item._id)) {
      setSelectedManuals((prevSelectedManuals) =>
        prevSelectedManuals.filter((manual) => manual._id !== item._id)
      );
    } else {
      setSelectedManuals((prevSelectedManuals) => [...prevSelectedManuals, item]);
    }
  }}
/>
      </div>
    </div>
  ))}
</main>
        )}
      </section>
    </main>
  );
};

export default ReceivedManual;
