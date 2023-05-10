import React, {SetStateAction} from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import StudentContext from "../Context/StudentContext";
import Home from "./pages/Home";
import Code from "./pages/Code";
import LoginPage from "./pages/Login";
import EnrollPage from "./pages/EnrollPage";
import Academic from "./pages/Academic";
import CreateManual from "./pages/CreateManual";
import Attendence from "./pages/Attendence";
import Practice from "./pages/Practice";
import SubmitManual from "./pages/SubmitManual";

//  faculty
import FacultyLogin from "./pages/faculty/LoginPage";
import FacultyEnrollPage from "./pages/faculty/EnrollPage";
import SelectPage from "./pages/SelectPage";
import FacultyContext from "../Context/FacultyContex";
import Error from "./pages/Error";
import UploadPracticals from "./pages/UploadPracticals";
import CoursesAndSyllabus from "./pages/CoursesAndSyllabus";
import CheckAttendence from "./pages/CheckAttendence";
import ReceivedManual from "./pages/ReceivedManual";
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
    path: "/upload-practicals",
    element: <UploadPracticals />,
  },
  {
   path: "/createmanual",
    element: <CreateManual />,
  },
  {
    path: "/submitmanual",
    element: <SubmitManual />,
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
        setCode={function (value: SetStateAction<string>): void {}}
      />
    ),
  },
  {
    path: "/code",
    element: <Code />,
  },
  {
    path: "/coursesandsyllabus",
    element: <CoursesAndSyllabus />,
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
    path: "*",
    element: <Error />,
  },
]);
const App = () => {
  return (
    <section className="w-full">
      {/* <Header /> */}
      <StudentContext>
        <FacultyContext>
          <RouterProvider fallbackElement={<>Error</>} router={router} />
        </FacultyContext>
      </StudentContext>
    </section>
  );
};

export default App;
