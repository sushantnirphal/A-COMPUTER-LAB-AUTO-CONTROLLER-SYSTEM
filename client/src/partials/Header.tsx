import { StudentContext } from "../../Context/StudentContext";
import { StudentType } from "interfaces/student";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Academic from "@/pages/Academic";
import MenuItem from "@/pages/MenuItem";
import { FacultyContext } from "../../Context/FacultyContex";
import UploadPracticals from "@/pages/UploadPracticals";
import UploadSyllabus from "@/pages/UploadSyllabus";

import { HiHome, HiCode, HiClipboardCheck, HiLogout, HiBookOpen, HiUpload, HiViewList, HiBeaker, HiDocument, HiUser, HiUserGroup, HiUsers } from 'react-icons/hi'

const Header = () => {
  const { student, setStudent } = useContext<any>(StudentContext);
  const isStudent = student?.role === "student";
  const isAdmin = student?.role === "admin";
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
    navigate("/");
  }
  const [isExpected, setIsExpected] = useState(false);

  return (
    <header className="shadow-md flex flex-col w-full h-full bg-dark-400">
      <main
        className="border-b  bg-purple_pri-500/20 w-11/12 mx-auto mt-3 rounded-md overflow-hidden shadow-lg border-dark-200 pt-4 mb-4"
      >
        <img
          className="w-6/12 mx-auto rounded-full border-2 bg-dark-400"
          src={student?.profile} alt={student?.name}
          onError={(e: ChangeEvent<HTMLImageElement>) => e.target.src = '/icons/coding.png'}
        />
        <div
          className="w-full text-center pt-4"
        >

          <Link
            to={'/profile'}
            className="text-white px-4 w-full text-center capitalize pt-2 underline"
          >
            {student?.name}
          </Link>
        </div>
        <h4 className="text-xs uppercase font-semibold mt-4 py-1  px-6 bg-purple_pri-500 text-white">
          {student?.role === "student" ? "Student"
            :
            student?.role === "admin"
              ? 'Admin'
              : "Faculty"
          }
        </h4>
      </main>
      <nav className="space-y-2 px-3 py-8 flex-col flex text-gray-400">
        {student && student?._id ? (
          <>

            {isStudent ? (
              <>
                {
                  [
                    {
                      title: 'Home',
                      link: '/home',
                      icon: <HiHome />,
                    },
                    {
                      title: 'Course Syllabus',
                      link: '/coursesyllabus',
                      icon: <HiBookOpen />,
                    },

                    {
                      title: 'Code',
                      link: '/code',
                      icon: <HiCode />,
                    },
                    {
                      title: 'Attendence',
                      link: '/attendence',
                      icon: <HiDocument />,
                    },
                    {
                      title: 'Create Manual',
                      link: '/createmanual',
                      icon: <HiClipboardCheck />,
                    },
                    {
                      title: 'Upload Manual',
                      link: '/uploadmanual',
                      icon: <HiUpload />,
                    },
                    {
                      title: 'Practice',
                      link: '/practice',
                      icon: <HiBeaker />,
                    },
                  ].map(({ link, title, icon }) => {

                    return (
                      <NavLink
                        key={title}
                        className={({ isActive }) => ` ${isActive ? 'bg-gradient-to-tr to-cyan_pri from-purple_pri-700 text-white' : 'bg-dark-200 hover:bg-dark-300'} flex items-center space-x-2 py-2 px-4 rounded-md text-sm`}
                        to={link}
                      >
                        {icon}
                        <p>
                          {title}
                        </p>
                      </NavLink>)
                  })
                }
              </>
            ) : null}
            {!isStudent && !isAdmin ? (
              <>

                {
                  [
                    {
                      title: 'Home',
                      link: '/home',
                      icon: <HiHome />,
                    },
                    {
                      title: 'Received Manual',
                      link: '/receivedmanual',
                      icon: <HiBookOpen />,
                    },
                    {
                      title: 'Check Attendence',
                      link: '/checkattendence',
                      icon: <HiClipboardCheck />,
                    },
                    {
                      title: 'Upload Practicals',
                      link: '/uploadpracticals',
                      icon: <HiUpload />,
                    },
                    {
                      title: 'Upload Syllabus',
                      link: '/uploadsyllabus',
                      icon: <HiCode />,
                    },

                  ].map(({ link, title, icon }) => {

                    return (
                      <NavLink
                        key={title}
                        className={({ isActive }) => ` ${isActive ? 'bg-gradient-to-tr to-cyan_pri from-purple_pri-700 text-white' : 'bg-dark-200 hover:bg-dark-300'} flex items-center space-x-2 py-2 px-4 rounded-md text-sm`}
                        to={link}
                      >
                        {icon}
                        <p>
                          {title}
                        </p>
                      </NavLink>)
                  })
                }
              </>
            ) : null}
            {
              student && student?.role === 'admin' &&

              [
                {
                  title: 'Students',
                  link: '/admin/student',
                  icon: <HiUser />,
                },
                {
                  title: 'Faculty',
                  link: '/admin/faculty',
                  icon: <HiUsers />,
                },
              ].map(({ link, title, icon }) =>
                <NavLink
                  key={title}
                  className={({ isActive }) => ` ${isActive ? 'bg-gradient-to-tr to-cyan_pri from-purple_pri-700 text-white' : 'bg-dark-200 hover:bg-dark-300'} flex items-center space-x-2 py-2 px-4 rounded-md text-sm`}
                  to={link}
                >
                  {icon}
                  <p>
                    {title}
                  </p>
                </NavLink>)
            }

          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}

      </nav>
      <main
        className="mt-auto p-4 pb-4 w-full"
      >
        <p
          className="bg-purple_pri-500 flex items-center space-x-2 cursor-pointer w-full hover:bg-purple_pri-700 text-white  rounded-lg font-normal text-sm py-2 px-4 focus:outline-none focus:shadow-outline"
          onClick={logout}
        >
          <HiLogout />
          <span>
            Logout
          </span>
        </p>
        <p
          className="text-white text-xs pt-3 text-right px-2"
        >
          v1.0.0
        </p>
      </main>
    </header>
  );
};

export default Header;
