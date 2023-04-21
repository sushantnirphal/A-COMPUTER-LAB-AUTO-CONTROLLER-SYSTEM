import Header from "../partials/Header";
import {Link} from "react-router-dom";
import {StudentContext} from "../../Context/StudentContext";
import React, {useContext, useState} from "react";
import Welcome from "@/partials/code/Welcome";
import Sidebar from "../partials/code/Sidebar";
import aims from "@/partials/aims";
const Home = () => {
  const {student, setStudent} = useContext(StudentContext);
  
  return (
    <main className=" h-screen overflow-y-auto gr-bg">
      <Header />
      <section className="pt-30 h-full ">
      <div className="py-12 text-slate-200 pt-20 text-xl font-serif">
        {/* <pre>{JSON.stringify(student, null, 4)}</pre> */}
        <div className="w-11/12  md:p-1  flex">
          
          <div className="ml-12 py-2  space-y-1">
      
          <img
            className="rounded-full w-40 h-40 border border-dashed p-2"
            src={student?.profile}
            alt=""
          />
            <h5>Full name : {student?.name}</h5>
            <h5>PRN : {student?.prn}</h5>
            <h5>Email : {student?.email}</h5>
            <h5>Phone number : {student?.phone}</h5>
            <h5>Branch : {student?.branch}</h5>
            <h5>Year : {student?.year}</h5>
            <p>Lives at : {student?.address}</p>
          </div>
          <div className="flex-1 h-full flex flex-col md:flex-row ">
          {
             <Welcome/> 
          }
        </div>
        </div>
      </div>
      </section>
    </main>
  );
};
export default Home;


