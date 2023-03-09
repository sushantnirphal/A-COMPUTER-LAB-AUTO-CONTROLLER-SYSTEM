import React from "react";
import Header from "./Header";

const Home = () => {
  return (
    <main>
      <Header />
      <section className="p-6">
        <form action="" className="flex xl:space-x-6 flex-wrap space-y-6">
          <div className="mr-6 border rounded-md p-4 flex space-x-4 justify-start">
            <label htmlFor="Year" className="text-lg"> Select Year:
            </label>
             

            <select
              name="Year"
              id="Year"
              className=" rounded-md ring-2"
              defaultValue={'Select year'}
            >
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
            <label htmlFor="Year" className="text-lg ">
              Select Branch:
            </label>

            <select name="Year" id="Year" className=" rounded-md ring-2">
              <option value="first">Computer Engineering</option>
              <option value="Second">Informartion Technology</option>
              <option value="third">AI</option>
            </select>
          </div>
          <div className="border mr-6 rounded-md p-4 flex space-x-4 justify-start">
            <label htmlFor="Sem" className="text-lg ">
              Select Semester:
            </label>

            <select name="Year" id="Year" className="mx-4 rounded-md ring-2">
              {[
                {
                  label: "First Sememser",
                  value: 1,
                },
                {
                  label: "Second Sememser",
                  value: 2,
                },
                {
                  label: "Third Sememser",
                  value: 3,
                },
                {
                  label: "Fourth Sememser",
                  value: 4,
                },
                {
                  label: "Fifth Sememser",
                  value: 5,
                },
                {
                  label: "Sixth Sememser",
                  value: 6,
                },
                {
                  label: "Seventh Sememser",
                  value: 7,
                },
                {
                  label: "Eight Sememser",
                  value: 8,
                },
              ].map(({label, value}) => (
                <option value={value}>{label}</option>
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
          <button className="border rounded-full py-2 px-6 bg-sky-500 text-white flex space-x-4 justify-start text-lg">Submit</button>
        </form>
      </section>
    </main>
  );
};

export default Home;
