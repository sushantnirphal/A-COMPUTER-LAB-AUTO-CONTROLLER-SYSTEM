import {StudentContext} from "../../Context/StudentContext";
import {StudentType} from "interfaces/student";
import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Academic from "@/pages/Academic";
import MenuItem from "@/pages/MenuItem";
import {FacultyContext} from "../../Context/FacultyContex";
import UploadPracticals from "@/pages/UploadPracticals";
import CoursesAndSyllabus from "@/pages/CoursesAndSyllabus";
const Header = () => {
  const {student, setStudent} = useContext<any>(StudentContext);
  const isStudent = student?.role === "student";
  const navigate = useNavigate();
  const router = useLocation();

  useEffect(() => {
    if (!student || !student._id) {
      navigate("/login");
    }
  }, [router.pathname]);

  useEffect(() => {
    setStudent(JSON.parse(localStorage.getItem("user") as string));

    if (window.location.href.endsWith("/login") && student?._id) {
      navigate("/home");
      console.log(student);
    }
  }, [location.pathname]);

  function logout() {
    setStudent({});
    localStorage.removeItem("user");
    navigate("/login");
  }
  const [isExpected, setIsExpected] = useState(false);

  return (
    <header className="py-5 px-6 shadow-md justify-between flex fixed w-full bg-slate-700">
      <Link to={"/"} className="text-xl text-sky-400 font-medium">
        {student?.role === "student" ? "Student" : "Faculty"}
      </Link>
      <nav className="space-x-4 text-lg text-slate-400 ">
        {student && student?._id ? (
          <>
            <Link className="hover:text-slate-200 text-white" to={"/"}>
              Home
            </Link>

            {/* <button onClick={() => setIsExpected(true)}>Academic</button>
            {isExpected && <MenuItem />} */}

            {isStudent ? (
              <>
                <Link className="hover:text-slate-200" to={"/coursesandsyllabus"}>
                  Courses&Syllabus
                </Link>
                <Link className="hover:text-slate-200" to={"/createmanual"}>
                  CreateManual
                </Link>
                <Link className="hover:text-slate-200" to={"/submitmanual"}>
                  SubmitManual
                </Link>
                <Link className="hover:text-slate-200 text-white" to={"/code"}>
                  Code
                </Link>

                <Link
                  className="hover:text-slate-200 text-white"
                  to={"/attendence"}
                >
                  Attendence
                </Link>
                <Link
                  className="hover:text-slate-200 text-white"
                  to={"/practice"}
                >
                  Practice
                </Link>
              </>
            ) : null}
            {!isStudent ? (
              <>
                <Link
                  className="hover:text-slate-200 text-white"
                  to={"/receivedmanual"}
                >
                  ReceivedManual
                </Link>
                <Link
                  className="hover:text-slate-200 text-white"
                  to={"/checkattendence"}
                >
                  CheckAttendence
                </Link>
                <select
                  className="border-none ring-0 outline-none bg-transparent"
                  onChange={(e) => navigate(e.target.value)}
                >
                  <option
                    // disabled
                    selected
                    className="bg-transparent px-2 text-sky-500"
                  >
                    {/* <Link to={"/uploadPracticals"}> UploadPracticals </Link> */}
                    Menu
                  </option>
                  <option
                    value="/upload-practicals"
                    className="bg-transparent px-2 text-sky-500"
                  >
                    UploadPracticals
                  </option>
                  <option
                    className="bg-transparent px-2 text-sky-500"
                    value="/course-syllabus"
                  >
                    CourseSyllabus
                  </option>
                </select>
              </>
            ) : null}

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  rounded-full font-normal text-sm py-3 px-5 focus:outline-none focus:shadow-outline"
              onClick={logout}
            >
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
