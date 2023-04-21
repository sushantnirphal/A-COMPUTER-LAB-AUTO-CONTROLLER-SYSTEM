import React, {SetStateAction} from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import StudentContext from "../Context/StudentContext";
import Home from "./pages/Home";
import Courses from "./partials/Courses";
import Code from "./pages/Code";
import LoginPage from "./pages/Login";
import EnrollPage from "./pages/EnrollPage";
import Academic from "./pages/Academic";
import Manualsubmission from "./pages/Manualsubmission";
import Attendence from "./pages/Attendence";
import Practice from "./pages/Practice";

//  faculty
import FacultyLogin from "./pages/faculty/LoginPage";
import FacultyEnrollPage from "./pages/faculty/EnrollPage";
import SelectPage from "./pages/SelectPage";
import FacultyContext from "../Context/FacultyContex";
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
