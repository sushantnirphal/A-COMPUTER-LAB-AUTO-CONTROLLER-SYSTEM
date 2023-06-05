import { StudentContext } from "../../../Context/StudentContext";
import { FacultyContext } from "../../../Context/FacultyContex";
import { SetStateAction, useContext, useEffect, useState } from "react";
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
  const { student: faculty, setStudent: setFaculty } =
    useContext<any>(StudentContext);

  const navigate = useNavigate();
  const router = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: {
    target: { value: SetStateAction<string> };
  }) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setLoading(true);
    const req = await fetch("http://localhost:7890/faculty/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });
    const res = await req.json();

    if (res.success) {
      setFaculty(res.data);
      if (res?.data?._id) {
        setLoading(false);
        navigate("/home");
      }
      localStorage.setItem("user", JSON.stringify(res.data));
    } else {
      setLoading(false);
      alert(res.message);
    }
  }

  useEffect(() => {
    console.log(faculty)
    if (faculty?._id) {
      navigate("/home")
      console.log("login now")
    }
  }, [faculty?._id])

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
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h5 className="text-3xl font-bold text-purple_pri-500 py-8">Faculty login</h5>
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
