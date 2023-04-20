import {StudentContext} from "../../../Context/StudentContext";
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
  const [loading, setLoading] = useState(false);
  // const {faculty, setFaculty} = useContext<any>(FacultyContext);
  const {student: faculty, setStudent: setFaculty} =
    useContext<any>(StudentContext);

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
    setLoading(true);
    const req = await fetch("http://localhost:7890/faculty/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
       email : username,
        password: password,
      }),
    });
    const res = await req.json();
   
    if (res.success) {
      setFaculty(res.data);
      if (res?.data?._id) {
        setLoading(false);
        navigate("/homes");
      }
      localStorage.setItem("user", JSON.stringify(res.data));
    } else {
      setLoading(false);
      alert(res.message);
    }
  }

  useEffect(() => {
    console.log(faculty)
    if(faculty?._id)  {
      navigate("/homes")
      console.log("login now")
    }
  }, [faculty?._id])

  return (
    <div className="flex justify-center items-center h-screen gr-bg">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h4 className="text-xl font-semibold text-white py-8">Faculty login</h4>
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
            disabled={loading}
            type="submit"
            className="bg-blue-500 rounded-full hover:bg-blue-700 text-white  py-3 px-6 text-sm font-normal focus:outline-none focus:shadow-outline"
          >
            {loading ? "Please wait..." : " Sign In"}
          </button>
        </div>
        <div className="space-y-2 pt-4">
          <span className="text-white  block cursor-pointer">
            Don't have an account, then
            <Link to={"/faculty/enroll"} className="text-sky-600 underline">
              Enroll here (faculty)
            </Link>
          </span>

          <span className="text-white  block cursor-pointer">
            Student login
            <Link to={"/login"} className="text-sky-600 underline">
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
