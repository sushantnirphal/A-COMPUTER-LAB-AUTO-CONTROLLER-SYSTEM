import Header from "@/partials/Header";
import React, { useState, useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "semantic-ui-react";



const Manualsubmission = () => {
  const componentRef = useRef(null);
  const printData=useReactToPrint({
    content:() => componentRef.current,
  });
  const [value, setValue] = useState('');

  return (
    
    <div className="h-screen gr-bg">
      <Header />
      <div className="p-12 md:p-32 h-full  overflow-y-auto text-slate-100">
      <h4 className="text-2xl md:text-2xl lg:text-2xl py-4 text-gr bg-clip-text text-transparent font-semibold">
        Create A Manual
      </h4>  
      <div ref={componentRef}>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
      <br/>
      <Button className="bg-blue-500 rounded-full hover:bg-blue-600 text-white  py-2 px-4 text-sm font-normal focus:outline-none focus:shadow-outline "
      primary onClick={printData}>Download</Button>
       
    </div>
    </div>
  );
};

export default Manualsubmission;
