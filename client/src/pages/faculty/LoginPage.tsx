import {FacultyContext} from "../../../Context/FacultyContex";
import {SetStateAction, useContext, useEffect, useState} from "react";
import {
  Link,
  json,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";

function LoginPage() {
  const {faculty, setFaculty} = useContext<any>(FacultyContext);
  const navigate = useNavigate();
  const router = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(event: {
    target: {value: SetStateAction<string>};
  }) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: {
    target: {value: SetStateAction<string>};
  }) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: {preventDefault: () => void}) {
    event.preventDefault();
    const req = await fetch("http://localhost:7890/faculty/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password: password,
      }),
    });
    const res = await req.json();
    console.log(res);
    if (res.success) {
      setFaculty(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(faculty);
    } else {
      alert(res.message);
    }
  }

  useEffect(() => {
    if (faculty?._id) {
      navigate("/");
    }
  }, [router.pathname, faculty?._id]);

  return (
    <div className="flex justify-center items-center h-screen gr-bg">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h4
         className="text-xl font-semibold text-white py-8"
        >Faculty login</h4>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-200 font-bold mb-2"
          >
            User Name
          </label>
          <input
            id="username"
            type="text"
            value={username}
            required
            onChange={handleUsernameChange}
            className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-gray-200 font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            required
            type="Password"
            value={password}
            onChange={handlePasswordChange}
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
