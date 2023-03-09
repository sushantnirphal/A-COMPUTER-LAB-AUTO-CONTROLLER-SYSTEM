import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className="py-3 px-6 shadow-md justify-between flex">
      <h4 className="text-lg text-sky-700 font-medium">Admin</h4>
      <nav className="space-x-4">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
      </nav>
    </header>
  );
};

export default Header;
