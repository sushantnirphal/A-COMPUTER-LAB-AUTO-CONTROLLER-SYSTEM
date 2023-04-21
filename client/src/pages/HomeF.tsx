import Headerf from "../partials/Headerf";
import {Link} from "react-router-dom";
import { FacultyContext } from "../../Context/FacultyContex";
import React, {useContext, useState} from "react";
import Welcome from "@/partials/code/Welcome";
import Sidebar from "../partials/code/Sidebar";
import aims from "@/partials/aims";
import Welcomef from "@/partials/code/Welcomef";
const Home = () => {
  const {faculty, setFaculty} = useContext(FacultyContext);
  
  return (
    <main className=" h-screen overflow-y-auto gr-bg">
      <Headerf />
      <section className="pt-30 h-full ">
      <div className="py-12 text-slate-200 pt-20 text-xl font-serif">
        {/* <pre>{JSON.stringify(student, null, 4)}</pre> */}
        <div className="w-11/12  md:p-1  flex">
          
          <div className="ml-12 py-2  space-y-1">
      
          <img
            className="rounded-full w-40 h-40 border border-dashed p-2"
            src={faculty?.profile}
            alt=""
          />
            <h5>Full name : {faculty?.name}</h5>
            <h5>Email : {faculty?.email}</h5>
            <h5>Phone number : {faculty?.phone}</h5>
          </div>
          <div className="flex-1 h-full flex flex-col md:flex-row ">
          {
             <Welcomef/> 
          }
        </div>
        </div>
      </div>
      </section>
    </main>
  );
};
export default Home;


