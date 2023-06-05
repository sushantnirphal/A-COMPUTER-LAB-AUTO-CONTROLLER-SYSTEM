import React, { SetStateAction, useContext, useEffect } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";


import Home from "./pages/Home";
import Code from "./pages/Code";
import LoginPage from "./pages/Login";
import EnrollPage from "./pages/EnrollPage";
import Academic from "./pages/Academic";
import CreateManual from "./pages/CreateManual";
import Attendence from "./pages/Attendence";
import Practice from "./pages/Practice";
import PasswordReset from "./pages/PasswordReset";
import ForgotPassword from "./pages/ForgotPassword";
import UploadManual from "./pages/UploadManual";
import UploadSyllabus from "./pages/UploadSyllabus";
import CourseSyllabus from "./pages/CourseSyllabus";

//  faculty
import FacultyLogin from "./pages/faculty/LoginPage";
import FacultyEnrollPage from "./pages/faculty/EnrollPage";
import SelectPage from "./pages/SelectPage";
import Error from "./pages/Error";
import UploadPracticals from "./pages/UploadPracticals";
import CheckAttendence from "./pages/CheckAttendence";
import ReceivedManual from "./pages/ReceivedManual";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import { StudentContext, StudentContextType } from "../Context/StudentContext";

// import FacultyHome from './p'
const router = createHashRouter([
  {
    path: "/home",
    element: <Home />,
    errorElement: <p>'Error page'</p>,
  },
  {
    path: "/",
    element: <SelectPage />,
  },
  {
    path: "/academic",
    element: <Academic />,
  },
  {
    path: "/forgotpassword/:id/:token",
    element: <ForgotPassword />,

  },
  {
    path: "/passwordreset",
    element: <PasswordReset />,

  },

  {
    path: "/uploadpracticals",
    element: <UploadPracticals onSaveTestCases={undefined} />,
  },
  {
    path: "/coursesyllabus",
    element: <CourseSyllabus />,
  },
  {
    path: "/createmanual",
    element: <CreateManual />,
  },
  {
    path: "/uploadmanual",
    element: <UploadManual />,
  },
  {
    path: "/attendence",
    element: <Attendence />,
  },
  {
    path: "/practice",
    element: (
      <Practice
        code={""}
        setCode={function (value: SetStateAction<string>): void { }}
      />
    ),
  },
  {
    path: "/code",
    element: <Code />,
  },
  {
    path: "/checkattendence",
    element: <CheckAttendence />,
  },
  {
    path: "/receivedmanual",
    element: <ReceivedManual />,
  },
  {
    path: "/uploadsyllabus",
    element: <UploadSyllabus />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/enroll",
    element: <EnrollPage />,
  },
  {
    path: "/faculty/enroll",
    element: <FacultyEnrollPage />,
  },
  {
    path: "/faculty/login",
    element: <FacultyLogin />,
  },

  {
    path: "/faculty/home",
    // element: <FacultyHome />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
const App = () => {
  const { student, update_student, update_faculty } = useContext(StudentContext) as StudentContextType;
  useEffect(() => {
    // update student on first load
    student?._id &&
      (student?.role === 'student'
        ? update_student()
        : update_faculty()
      )
  }, [student?._id])
  return (
    <section className="w-full">
      <RouterProvider fallbackElement={<>Error</>} router={router} />
    </section>
  );
};

export default App;
