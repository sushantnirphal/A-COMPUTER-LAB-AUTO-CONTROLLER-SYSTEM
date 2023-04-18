import {StudentContext} from "../../Context/StudentContext";
import {SetStateAction, useContext, useEffect, useState} from "react";
import {
  Link,
  json,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";

function LoginPage() {
  const {student, setStudent} = useContext<any>(StudentContext);
  const navigate = useNavigate();
  const router = useLocation();
  const [loading, setLoading] = useState(false);
  const [prn, setPrn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handlePrnChange(event: {target: {value: SetStateAction<string>}}) {
    setPrn(event.target.value);
  }

  function handlePhoneNumberChange(event: {
    target: {value: SetStateAction<string>};
  }) {
    setPhoneNumber(event.target.value);
  }

  async function handleSubmit(event: {preventDefault: () => void}) {
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
      console.log(student, "here");
      setLoading(false);
    } else {
      alert(res.message);
      setLoading(false);
    }
  }
  const location = useLocation();
  console.log(student,  "student", location.pathname)

  useEffect(() => {
    if(location.pathname === "/login" && student?._id)  {
      navigate("/home")
      console.log("login now")
    }
  }, [student?._id]);

  return (
    <div className="flex justify-center items-center h-screen gr-bg">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h5 className="text-xl font-semibold text-white py-8">Student login</h5>
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
            className="bg-blue-500 rounded-full hover:bg-blue-700 text-white  py-3 px-6 text-sm font-normal focus:outline-none focus:shadow-outline"
          >
            {loading ? "Please wait..." : " Sign In"}
          </button>
        </div>
        <div className="space-y-2 pt-4">
          <span className="text-white  block cursor-pointer">
            Don't have an account ,then
            <Link to={"/enroll"} className="text-sky-600 underline">
              {" "}
              Enroll here
            </Link>
          </span>

          <span className="text-white  block cursor-pointer">
            Faculty
            <Link to={"/faculty/login"} className="text-sky-600 underline">
              {" "}
              Click here
            </Link>
          </span>
          <span className="text-white  block cursor-pointer">
            <Link to={"/"} className="text-sky-600 underline">
              {" "}
              Go back
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
