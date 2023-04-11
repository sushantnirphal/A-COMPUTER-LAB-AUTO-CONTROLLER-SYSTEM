import {FacultyContext} from "../../../Context/FacultyContex";
import {FacultyType} from "interfaces/faculty";
import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Academic from "@/pages/Academic";
import MenuItem from "@/pages/MenuItem";

const Header = () => {
  const {faculty, setFaculty} = useContext<any>(FacultyContext);
  const navigate = useNavigate();
  const router = useLocation();
  
  useEffect(() => {
    if (!faculty || !faculty._id) {
      navigate("/login");
    }
  }, [router.pathname]);
  function logout() {
    setFaculty({});
    localStorage.removeItem("user");
    navigate("/login");
  }
  const [isExpected, setIsExpected] = useState(false)

  return (
    <header className="py-5 px-6 shadow-md justify-between flex fixed w-full bg-slate-700">
      <h4 className="text-xl text-sky-400 font-medium">Faculty</h4>
      <nav className="space-x-4 text-lg text-slate-400 ">
        {faculty && faculty?._id ? (
          <>
            <Link className="hover:text-slate-200 text-white" to={"/"}>
            Attendence
            </Link>
            <Link className="hover:text-slate-200 text-white" to={"/manualsubmission"}>
            GenerateReport
            </Link>
            <Link className="hover:text-slate-200 text-white" to={"/attendence"}>
            ReceivedManual
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
