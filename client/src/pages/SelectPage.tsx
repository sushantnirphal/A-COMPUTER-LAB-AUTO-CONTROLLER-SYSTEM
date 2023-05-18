import {StudentContext} from "../../Context/StudentContext";
import {SetStateAction, useContext, useEffect, useState} from "react";
import {
  Link,
  json,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";

function SelectPage() {
  const {student, setStudent} = useContext<any>(StudentContext);
  const navigate = useNavigate();
  const router = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student?._id) {
      navigate("/home");
    }
  }, [router.pathname, student?._id]);

  return (
    <div className="flex justify-center items-center h-screen gr-bg">
      <div>
        <h2
        className="text-2xl md:text-2xl lg:text-2xl  py-4 text-gr flex items-center justify-center bg-clip-text text-transparent font-semibold"
        >Choose Profile</h2>
        <section className="w-full space-x-12 max-w-sm flex items-center justify-center">
          <Link
            to={"/login"}
            className="w-60 h-24 bg-slate-900/40 text-white border grid place-items-center border-slate-500 rounded-md shadow-xl"
          >
            Student Login
          </Link>
          <Link
            to={"/faculty/login"}
            className="w-60 h-24 bg-slate-900/40 text-white border grid place-items-center border-slate-500 rounded-md shadow-xl"
          >
            Faculty Login
          </Link>
        </section>
      </div>
    </div>
  );
}

export default SelectPage;
