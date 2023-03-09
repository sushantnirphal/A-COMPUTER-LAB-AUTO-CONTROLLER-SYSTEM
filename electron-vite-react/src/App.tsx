import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Home from "./partials/Home";
import Courses from "./partials/Courses";
import Header from "./partials/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/courses",
    element: <Courses />,
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
