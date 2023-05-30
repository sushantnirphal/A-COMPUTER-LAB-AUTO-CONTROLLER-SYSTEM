import React, {useEffect, useState} from "react";
import FileViewer from "react-file-viewer";

const File_Viewer = ({id}: {id: string}) => {
  const [file, setFile] = useState<{file_type: string; url: string} | any>({});

  async function get_file_by_id() {
    const fileData = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/manual/file/${id}`
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
      <div>
        <FileViewer
          key={id}
          fileType={file.file_type || "pdf"}
          filePath={file.file || ""}
        />
        {/* {file && <p>{JSON.stringify(file)}</p>} */}
      </div>
    );
  }
};

export default File_Viewer;



































