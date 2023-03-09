import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className="py-5 px-6 shadow-md justify-between flex fixed w-full bg-slate-700">
      <h4 className="text-xl text-sky-400 font-medium">Admin</h4>
      <nav className="space-x-4 text-lg text-slate-400 ">
        <Link className="hover:text-slate-200"  to={"/"}>Home</Link>
        <Link className="hover:text-slate-200" to={"/courses"}>Courses</Link>
        <Link className="hover:text-slate-200" to={"/code"}>Code</Link>
      </nav>
    </header>
  );
};

export default Header;
