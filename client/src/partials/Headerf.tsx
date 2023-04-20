import {FacultyContext} from "../../Context/FacultyContex";
import { FacultyType } from "interfaces/faculty";
import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Academic from "@/pages/Academic";
import MenuItem from "@/pages/MenuItem";


const Headerf = () => {
  const {faculty, setFaculty} = useContext<any>(FacultyContext);
  const navigate = useNavigate();
  const router = useLocation();

  useEffect(() => {
    if (!faculty || !faculty._id) {
      navigate("/faculty/login");
    }
  }, [router.pathname]);

  useEffect(() => {
    setFaculty(JSON.parse(localStorage.getItem("user")));
    
    if (window.location.href.endsWith("/faculty/login") && faculty?._id) {
      navigate("/homes");
      console.log(faculty);
    }
  }, [location.pathname]);

  function logout() {
    setFaculty({});
    localStorage.removeItem("user");
    navigate("/faculty/login");
  }
  const [isExpected, setIsExpected] = useState(false);

  return (
    <header className="py-5 px-6 shadow-md justify-between flex fixed w-full bg-slate-700">
      <h4 className="text-xl text-sky-400 font-medium">
        {faculty?.role === "faculty" ? "Faculty" : "Student"}
      </h4>
      <nav className="space-x-4 text-lg text-slate-400 ">
        {faculty && faculty?._id ? (
          <>
            <Link className="hover:text-slate-200 text-white" to={"/homes"}>
              Home
            </Link>
           
            <Link className="hover:text-slate-200 text-white" to={"/receivedmanuals"}>
            ReceivedManuals
            </Link>
            <Link className="hover:text-slate-200 text-white" to={"/attendencereport"}>
            CheckAttendence
            </Link>
            <Link className="hover:text-slate-200 text-white" to={"/generatereport"}>
            Report
            </Link>
            
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  rounded-full font-normal text-sm py-3 px-5 focus:outline-none focus:shadow-outline"
              onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to={"/faculty/login"}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Headerf;
