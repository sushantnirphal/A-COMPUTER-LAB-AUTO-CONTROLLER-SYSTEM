import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return <div className="h-screen  flex items-center justify-center flex-col space-y-6 gr-bg">
    <img src="/404.webp" alt="404" className="w-11/12 aspect-auto max-h-[400px] max-w-[600px] " />
    <Link to={'/'} className="rounded-full px-6 py-2 bg-sky-600 text-white ">Go to home</Link>
  </div>;
};

export default Error;
