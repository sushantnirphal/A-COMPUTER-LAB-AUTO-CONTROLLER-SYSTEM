import React from "react";
import Header from "@/partials/Header";
import { Link } from "react-router-dom";
const PDF_FILE ='http://localhost:5173/BTechComp.pdf'
const CoursesAndSyllabus = () => {
  const downloadFileAtURL=(url)=>{
    const fileName =url.split('/').pop();
    const aTag =document.createElement('a');
    aTag.href=url;
    aTag.setAttribute('download',fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();

  }
  return (
    <div className="h-screen overflow-y-auto gr-bg">
      <Header/>
      <div className="p-12 md:p-32 h-full  overflow-y-auto text-slate-100"> 
      <h4 className="text-2xl md:text-2xl lg:text-2xl py-4 text-gr bg-clip-text text-transparent font-semibold">
        List of Practical Courses & Syllabus
      </h4>
    
      <ul>
        <li className="text-xl text-yellow-300 font-semibold">
          <span> Pyhton &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<button className="bg-green-600 rounded-full hover:bg-green-500 text-white  py-2 px-4 text-sm font-normal focus:outline-none focus:shadow-outline"
          onClick={()=>{downloadFileAtURL(PDF_FILE)}}> Download</button></span>
        </li>
        <br/>
        <li className="text-xl text-yellow-300 font-semibold">
        <span> Java &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <button className="bg-green-600 rounded-full hover:bg-green-500 text-white  py-2 px-4 text-sm font-normal focus:outline-none focus:shadow-outline"
          onClick={()=>{downloadFileAtURL(PDF_FILE)}}> Download</button></span>
        </li>
        <br/>
        <li className="text-xl text-yellow-300 font-semibold">
        <span>  Data Structure & Alogorithm &nbsp; &nbsp; &nbsp; <button className="bg-green-600 rounded-full hover:bg-green-500 text-white  py-2 px-4 text-sm font-normal focus:outline-none focus:shadow-outline"
          onClick={()=>{downloadFileAtURL(PDF_FILE)}}> Download</button></span>
        </li>
      </ul>
    
    </div>

    </div>
        
    );
    
  
    
};

export default CoursesAndSyllabus;
