import {StudentContext} from "../../Context/StudentContext";
import {StudentType} from "interfaces/student";
import React, {useContext, useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

const Header = () => {
  const {student, setStudent} = useContext<any>(StudentContext);
  const navigate = useNavigate();
  const router = useLocation();
  useEffect(() => {
    if (!student || !student._id) {
      navigate("/login");
    }
  }, [router.pathname]);
  function logout() {
    setStudent({});
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <header className="py-5 px-6 shadow-md justify-between flex fixed w-full bg-slate-700">
      <h4 className="text-xl text-sky-400 font-medium">Admin</h4>
      <nav className="space-x-4 text-lg text-slate-400 ">
        {student && student?._id ? (
          <>
            <Link className="hover:text-slate-200" to={"/"}>
              Home
            </Link>
            <Link className="hover:text-slate-200" to={"/courses"}>
              Courses
            </Link>
            <Link className="hover:text-slate-200" to={"/code"}>
              Code
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
