import Header from "../partials/Header";
import {Link} from "react-router-dom";
import {StudentContext} from "../../Context/StudentContext";
import React, {useContext} from "react";
const Home = () => {
  const {student, setStudent} = useContext(StudentContext);
  return (
    <main className=" h-screen overflow-y-auto gr-bg">
      <Header />
      {/* <section className=" pt-20">
        <form action="" className="flex xl:space-x-6 flex-wrap space-y-6">
          <div  className=" border mr-6 ml-6  rounded-md p-4  flex space-x-4 justify-start ">
            <label htmlFor="Year" className="text-lg">Select Year:
            </label>
          
            <select name="Year" id="Year" className=" rounded-md ring-2" defaultValue={'Select year'}>
              <option value="first" disabled>
                Select year
              </option>
              <option value="first">First Year</option>
              <option value="Second">Second Year</option>
              <option value="third">Third Year</option>
              <option value="fourth">Fourth Year</option>
            </select>
          </div>
          <div className="border mr-6 rounded-md p-4 flex space-x-4 justify-start">
            <label htmlFor="Branch" className="text-lg">
              Select Branch:
            </label>

            <select name="Branch" id="Branch" className=" rounded-md ring-2">
              <option value="first">Computer Engineering</option>
              <option value="Second">Informartion Technology</option>
              <option value="third">AI</option>
            </select>
          </div>
          <div className="border mr-6 rounded-md p-4 flex space-x-4 justify-start">
            <label htmlFor="Sem" className="text-lg">
              Select Semester:
            </label>

            <select name="Semester" id="Semester" className="mx-4 rounded-md ring-2">
              {[
                {
                  label: "First Semester",
                  value: 1,
                },
                {
                  label: "Second Semester",
                  value: 2,
                },
                {
                  label: "Third Semester",
                  value: 3,
                },
                {
                  label: "Fourth Semester",
                  value: 4,
                },
                {
                  label: "Fifth Semester",
                  value: 5,
                },
                {
                  label: "Sixth Semester",
                  value: 6,
                },
                {
                  label: "Seventh Semester",
                  value: 7,
                },
                {
                  label: "Eight Semester",
                  value: 8,
                },
              ].map(({label, value}) => (
                <option
                key={label}
                 value={value}>{label}</option>
              ))}
            </select>
          </div>
          <div className="border rounded-md p-4 flex space-x-4 justify-start">
            <label htmlFor="Sem" className="text-lg ">
              Select Subject:
            </label>

            <select name="Subject" id="Year" className="mx-4 rounded-md ring-2">
              {[
                {
                  label: "C",
                  value: 1,
                },
                {
                  label: "C++",
                  value: 2,
                },
                {
                  label: "Python",
                  value: 3,
                },
                {
                  label: "Java",
                  value: 4,
                },
                {
                  label: "R",
                  value: 5,
                },
                {
                  label: "Web Development",
                  value: 6,
                },
                {
                  label: "SQL",
                  value: 7, 
                },
                {
                  label: "Javascript",
                  value: 8,
                },
              ].map(({label, value}) => (
                <option value={value}>{label}</option>
              ))}
            </select>
          </div>
          <Link to={"/code"}><button className="border rounded-full p-4 bg-sky-500 text-white flex space-x-4 justify-start text-lg">Submit</button></Link>
          
        </form>
      </section> */}
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
            <h5>PRN : {student?.prn}</h5>
            <h5>Email : {student?.email}</h5>
            <h5>Phone number : {student?.phone}</h5>
            <div className="flex space-x-4">
              <h5>Branch : {student?.branch}</h5>
              <h5>Year : {student?.year}</h5>
              <h5>Semester : {student?.semester}</h5>
            </div>
            <p>Lives at : {student?.address}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
