import React, { SetStateAction } from "react";
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
import FacultyLogin from './pages/faculty/LoginPage'
import SelectPage from "./pages/SelectPage";
import Error from "./pages/404";
const router = createHashRouter([
  {
    path: "/",
    element: <SelectPage />,
  },
  {
    path: "/home",
    element: <Home />,
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
    path:"/practice",
    element:<Practice/>

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
    path:"/enroll",
    element:<EnrollPage/>,
  },
  {
    path:"/faculty/login",
    element:<FacultyLogin/>,
  },
  {
    path:"/*",
    element:<Error/>,
  }
]);
const App = () => {
  return (
    <>
      {/* <Header /> */}
      <StudentContext>
        <RouterProvider router={router} />
      </StudentContext>
    </>
  );
};

export default App;
