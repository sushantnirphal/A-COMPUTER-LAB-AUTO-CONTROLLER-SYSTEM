import { StudentContext } from "../../Context/StudentContext";
import { SetStateAction, useContext, useEffect, useState } from "react";
import {
  Link,
  json,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";

function LoginPage() {
  const { student, setStudent } = useContext<any>(StudentContext);
  const navigate = useNavigate();
  const router = useLocation();
  const [loading, setLoading] = useState(false);
  const [prn, setPrn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handlePrnChange(event: { target: { value: SetStateAction<string> } }) {
    setPrn(event.target.value);
  }

  function handlePhoneNumberChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    setPhoneNumber(event.target.value);
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    setLoading(true);
    event.preventDefault();
    const req = await fetch("http://localhost:7890/student/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        prn,
        phone: phoneNumber,
      }),
    });
    const res = await req.json();
    console.log(res);
    if (res.success) {
      setStudent(res?.student);
      localStorage.setItem("user", JSON.stringify(res?.student));
      setLoading(false);
    } else {
      alert(res.message);
      setLoading(false);
    }
  }
  const location = useLocation();
  // console.log(student,  "student", location.pathname)

  useEffect(() => {
    if (location.pathname === "/login" && student?._id) {
      navigate("/home")
      // console.log("login now")
    }
  }, [student?._id]);

  return (
    <div className="grid p-12 place-items-center h-screen gr-bg">
      <section
        className="flex border-2 border-dark-200 bg-dark-400 h-full w-11/12 rounded-lg overflow-hidden"
      >
        <aside
          className="w-full relative h-full md:w-1/2 bg-[url('bg.jpg')] bg-bottom bg-cover"
        >
          <div className="absolute inset-0 backdrop-filter backdrop-blur-sm"></div>
        </aside>
        <main
          className="p-8 w-1/2"
        >
          <form onSubmit={handleSubmit} className="w-full px-12">
            <h5 className="text-3xl font-bold text-purple_pri-500 py-8">Student login</h5>
            <div className="mb-4">
              <label htmlFor="prn" className="block text-gray-200 font-bold mb-2">
                PRN
              </label>
              <input
                id="prn"
                type="text"
                value={prn}
                required
                onChange={handlePrnChange}
                className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-200 font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                required
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="shadow appearance-none bg-transparent border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                disabled={loading}
                type="submit"
                className="bg-purple_pri-500 rounded-full hover:bg-purple_pri-600 text-white  py-3 px-6 text-sm font-normal focus:outline-none focus:shadow-outline"
              >
                {loading ? "Please wait..." : " Sign In"}
              </button>
            </div>
            <div className="space-y-2 pt-12">

              <span className="text-white  block cursor-pointer">
                Forgot Password
                <Link to={"/passwordreset"} className="text-purple_pri-500 underline">
                  {" "}
                  Click here
                </Link>
              </span>


              <span className="text-white  block cursor-pointer">
                <Link to={"/"} className="text-purple_pri-500 underline">
                  {" "}
                  Go back
                </Link>
              </span>
            </div>
          </form>
        </main>
      </section>
    </div>
  );
}

export default LoginPage;
