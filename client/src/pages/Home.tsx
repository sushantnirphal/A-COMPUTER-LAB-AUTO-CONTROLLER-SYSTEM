import Header from "../partials/Header";
import {Link} from "react-router-dom";
import {StudentContext} from "../../Context/StudentContext";
import React, {useContext} from "react";
const Home = () => {
  const {student, setStudent} = useContext<any>(StudentContext);
  const isStudent = student?.role === "student";
  return (
    <main className=" h-screen overflow-y-auto gr-bg">
      <Header />

      <div className="py-12 text-slate-200 pt-20 text-xl font-serif">
        {/* <pre>{JSON.stringify(student, null, 4)}</pre> */}
        <h4 className="text-sm py-3 px-6 bg-green-600 text-white  ml-auto">
          {student?.role === "student" ? "Student" : "Teacher"}
        </h4>
        <div className="w-11/12 mx-auto p-6 items-center flex">
          <img
            className="rounded-full w-40 h-40 border border-dashed p-2"
            src={student?.profile}
            alt=""
          />
          <div className="ml-12 py-2 space-y-2">
            <h5>Full name : {student?.name}</h5>
            {isStudent ? (
              <>
                <h5>PRN : {student?.prn}</h5>
                <div className="flex space-x-4">
                  <h5>Branch : {student?.branch}</h5>
                  <h5>Year : {student?.year}</h5>
                </div>
                <p>Lives at : {student?.address}</p>
              </>
            ) : null}

            <h5>Email : {student?.email}</h5>
            <h5>Phone number : {student?.phone}</h5>

           
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
