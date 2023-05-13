import React, {useEffect, useState} from "react";
import FileViewer from "react-file-viewer";

const File_Viewer = ({id}: {id: string}) => {
  const [file, setFile] = useState<{file_type: string; url: string} | any>({});
  async function get_file_by_id() {
    const file =await fetch(
      `${import.meta.env.VITE_SERVER_URL}/manual/file/${id}`
    ).then((a) => a.json());
    console.log(file)
    setFile(file.data);
  }

  useEffect(() => {
    get_file_by_id();
    console.log(file);
  }, [id]);
  return (
    <div>
      {file && (
        <FileViewer key={id} type={file?.file_type || "pdf"} url={file?.file} />
      )}
      {file && <p>{JSON.stringify(file)}</p>}
    </div>
  );
};

export default File_Viewer;
