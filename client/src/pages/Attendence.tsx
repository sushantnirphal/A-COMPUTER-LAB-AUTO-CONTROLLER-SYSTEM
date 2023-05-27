import React from "react";
import Header from "@/partials/Header";
import {StudentContext} from "../../Context/StudentContext";
import {useContext, useEffect} from "react";
import {useState} from "react";
import ReverseTimer from "@/partials/code/ReverseTimer";

const Attendence = () => {
  const {student, setStudent} = useContext<any>(StudentContext);

  return (
    <>
      <div className="h-screen gr-bg">
        <Header />
        Attendence
        <section className="m-28">
          <h1 className="text-white">Student Name :{student?.name}</h1>
          <h1 className="text-white">Attendence:</h1>
        </section>
      </div>
    </>
  );
};

export default Attendence;
