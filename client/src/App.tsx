import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from "./partials/Home";
import Courses from "./partials/Courses";
import Header from "./partials/Header";
import Code from "./partials/Code";

const router = createBrowserRouter([
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
]);
const App = () => {
  return (
    <>
      {/* <Header /> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
