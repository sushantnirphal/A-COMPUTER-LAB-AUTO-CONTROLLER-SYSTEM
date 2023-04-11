import React, { SetStateAction } from "react";
import {
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";

import FacultyContext from "Context/FacultyContex";
import Home from "./Home";
import Attendence from "../Attendence";
import GenerateReport from "./GenerateReport";
import ReceivedManual from "./ReceivedManual";
import LoginPage from "../Login";
import EnrollPage from "../EnrollPage";
import { RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/attendence",
    element: <Attendence />,
  },
  {
    path: "/generatereport",
    element: <GenerateReport />,
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
    path:"/enroll",
    element:<EnrollPage/>,
  }
]);
const App=()=>{
    return(
        <>
         <FacultyContext>
            <RouterProvider router={router}/>
         </FacultyContext>
        </>
    )
}


export default App;
