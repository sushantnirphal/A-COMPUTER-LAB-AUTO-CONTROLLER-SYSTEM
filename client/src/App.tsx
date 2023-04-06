import React from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import StudentContext from "../Context/StudentContext";
import Home from "./pages/Home";
import Courses from "./partials/Courses";
import Header from "./partials/Header";
import Code from "./pages/Code";
import LoginPage from "./pages/Login";
import EnrollPage from "./pages/EnrollPage";
const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
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
