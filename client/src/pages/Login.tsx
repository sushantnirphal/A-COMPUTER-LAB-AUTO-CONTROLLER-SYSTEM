import {StudentContext} from "../../Context/StudentContext";
import {useContext, useEffect, useState} from "react";
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
  const [prn, setPrn] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function handlePrnChange(event) {
    setPrn(event.target.value);
  }

  function handlePhoneNumberChange(event) {
    setPhoneNumber(event.target.value);
  }

  async function handleSubmit(event) {
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
      setStudent(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(student);
    } else {
      alert(res.message);
    }
  }

  useEffect(() => {
    if (student?._id) {
      navigate("/");
    }
  }, [router.pathname, student?._id]);

  return (
    <div className="flex justify-center items-center h-screen gr-bg">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
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
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
         
        </div>
        <span className="text-white  block cursor-pointer">
            Don't have an account ,then
            <Link to={"/enroll"} className="text-sky-600 underline"> Enroll here</Link>
          </span>
      </form>
    </div>
  );
}

export default LoginPage;
