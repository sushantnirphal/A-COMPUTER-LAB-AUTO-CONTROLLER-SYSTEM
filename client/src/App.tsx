import React, {SetStateAction} from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import StudentContext from "../Context/StudentContext";
import Home from "./pages/Home";
import Homes from "./pages/HomeF";
import Courses from "./partials/Courses";
import Code from "./pages/Code";
import LoginPage from "./pages/Login";
import EnrollPage from "./pages/EnrollPage";
import Academic from "./pages/Academic";
import Manualsubmission from "./pages/Manualsubmission";
import Attendence from "./pages/Attendence";
import Practice from "./pages/Practice";
import GenerateReport from "./pages/GenerateReport";
import ReceivedManuals from "./pages/ReceivedManuals";
import AttendenceReport from "./pages/AttendenceReport";

//  faculty
import FacultyHome from "./pages/HomeF";
import FacultyLogin from "./pages/faculty/LoginPage";
import FacultyEnrollPage from "./pages/faculty/EnrollPage";
import SelectPage from "./pages/SelectPage";
import FacultyContext from "../Context/FacultyContex";
import Report from "./pages/GenerateReport";
import CheckAttendence from "./pages/AttendenceReport";
const router = createHashRouter([
  {
    path: "/home",
    element: <Home />,
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
    path: "/manualsubmission",
    element: <Manualsubmission />,
  },
  {
    path: "/attendence",
    element: <Attendence />,
  },
  {
    path: "/practice",
    element: <Practice />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/code",
    element: <Code />,
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
    element: <FacultyHome />,
  },
  {
    path:"/homes",
    element:<Homes />,
  },
  {
    path:"/generatereport",
    element:<Report/>,
  },
  {
    path:"/attendencereport",
    element:<CheckAttendence />,
  },
  {
    path:"/receivedmanuals",
    element:<ReceivedManuals />,
  },
]);
const App = () => {
  return (
    <>
      {/* <Header /> */}
      <StudentContext>
        <FacultyContext>
          <RouterProvider router={router} />
        </FacultyContext>
      </StudentContext>
    </>
  );
};

export default App;
