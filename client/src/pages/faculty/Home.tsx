import Header from "./Header";
import {Link} from "react-router-dom";
import { FacultyContext } from "Context/FacultyContex";
import React, {useContext} from "react";
const Home = () => {
  const {faculty, setFaculty} = useContext(FacultyContext);
  return (
    <main className=" h-screen overflow-y-auto gr-bg">
      <Header />
          <div className="w-11/12 mx-auto p-6 items-center flex">
          <img
            className="rounded-full w-40 h-40 border border-dashed p-2"
            src={faculty?.profile}
            alt=""
          />
          <div className="ml-12 py-2 space-y-2">
            <h5>Full name : {faculty?.name}</h5>
            <h5>Email : {faculty?.email}</h5>
            <h5>Phone number : {faculty?.phone}</h5>
          </div>
        </div>
    </main>
  );
};

export default Home;
