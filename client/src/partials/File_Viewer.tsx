import React, { useEffect, useState } from "react";
import FileViewer from "react-file-viewer";

const File_Viewer = ({ id, isSubmitted = false }: { id: string, isSubmitted?: boolean }) => {
  const [file, setFile] = useState<{ file_type: string; url: string } | any>({});

  async function get_file_by_id() {
    const fileData = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/${isSubmitted ? 'submitmanual' : "manual"}/file/${id}`
    ).then((a) => a.json());
    console.log(fileData);
    setFile(fileData.data);
  }

  useEffect(() => {
    get_file_by_id();
  }, [id]);

  if (file && Object.keys(file).length) {
    console.log(file)
    return (
      <div
        className="p-6"
      >
        <FileViewer
          key={id}
          fileType={file.file_type || "pdf"}
          filePath={file.file || ""}
        />
        {/* {file && <p>{JSON.stringify(file)}</p>} */}
      </div>
    );
  }
  return <h4
    className="bg-dark-400 text-purple_pri-500  text-xl font-semibold w-11/12 mx-auto p-4"
  >Searching file</h4>
};

export default File_Viewer;



































