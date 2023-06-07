import Header from "../partials/Header";
import { Link } from "react-router-dom";
import { StudentContext } from "../../Context/StudentContext";
import React, { useContext, useEffect } from "react";
import RootLayout from "@/partials/Layout";
import { FaHandSparkles } from 'react-icons/fa'
const Home = () => {
  const { student, setStudent, update_student } = useContext<any>(StudentContext);
  const isStudent = student?.role === "student";

  function greet_message() {
    const hour = new Date().getHours();
    if (hour >= 16) return "Good Evening"
    if (hour >= 12) return "Good Afternoon"
    return "Good Morning"
  }

  useEffect(() => {
    // student?._id && update_student()
  }, [])
  return (
    <RootLayout>
      <section>
        <div className="py-12 border-b border-dark-200 text-slate-200 pt-20 text-xl font-serif mx-auto w-11/12">
          {/* <pre>{JSON.stringify(student, null, 4)}</pre> */}
          <h5 className="text-3xl font-semibold text-white flex ">Hey<FaHandSparkles className="text-yellow-400" />, {greet_message()}!</h5>
          <main className="text-2xl md:text-6xl lg:text-[6rem] leading-14 py-4 text-gr bg-clip-text text-transparent font-black">
            <h2> Welcome to CodeX </h2>
            <h2
              className="capitalize"
            >
              {student?.name}.
            </h2>
          </main>
          <p className="text-2xl text-right">Good to see you back.</p>
        </div>
      </section>
      <section
        style={{
          display: isStudent ? 'block' : 'none'
        }}
        className="p-16 text-white"
      >
        <h3
          className="font-semibold text-2xl text-gr text-transparent bg-clip-text"
        >
          Practical you completed.
        </h3>
        <main
          className="flex py-8 w-full flex-wrap justify-start"
        >
          {
            !student?.practical_completed?.length &&
            <h4>
              Loading...
            </h4>
          }
          {

            isStudent && student?.practical_completed.map((item: any) =>

              <article
                key={item?._id}
                className="w-full md:w-[32%] shadow-xl hover:shadow-purple_pri-600/10 group border border-dark-200 hover:border-purple_pri-500 transition mr-[1%] mb-4 rounded-md p-4 bg-dark-400 hover:bg-purple_pri-500/20"
              >
                <p
                  className="text-sm text-slate-300 transition group-hover:text-purple_pri-500 font-semibold"
                >
                  {(`${item?.practical_no}`.padStart(2, '0'))}) {item?.aim}
                </p>
                <div
                  className="text-xs py-2 transition text-slate-300 group-hover:text-purple_pri-600"
                >
                  <p>
                    Mark : {item?.marks}
                  </p>
                </div>
              </article>
            )
          }
          
        </main>
        
      </section>
    </RootLayout>
  );
};

export default Home;
