import extractFormData from "@/utils/Extractform";
import {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";

function EnrollPage() {
  console.log("im here");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("here");
    event.preventDefault();
    setLoading(true);
    const payload = extractFormData(event.currentTarget);
    console.log(payload);
    // return;
    const req = await fetch("http://localhost:7890/faculty/enroll", {
      method: "post",
      body: JSON.stringify({
        payload: {
          ...payload,
          name: payload.fname + " " + payload.lname,
          profile,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    console.log(res);
    if (res.success) {
      alert("Account created successfully, You can login now.");

      setLoading(false);
    } else {
      alert(res.message);
      setLoading(false);
    }
  };

  async function handleFile(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) {
    if(e.target.files){
      const file = e.target.files[0];
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg"
      ) {
        e.target.value = "";
        return alert("Please upload image file (.png, .jpeg, .jpg)");
      }
      if (file.size / 1000 > 500) {
        e.target.value = "";
        return alert("Please upload file under 500kb");
      }
      const reader = new FileReader();
      reader.readAsDataURL(file as File);
      reader.onload = () => {
        setter(reader.result as string);
      };
    }
   
  }
  return (
    <div>
      {/* <Header /> */}
      <main className="gr-bg py-12 text-center text-white">
      <h2 className="text-xl  font-semibold text-white py- text-center">
      Faculty enroll form
          </h2>
        
        <form
          onSubmit={handleSubmit}
          className="gr-bg  p-12 rounded-lg mb-4 w-11/12 max-w-[700px] mx-auto"
        >
          <input type="hidden" name="role" value={"setter"} />
          <div className="mb-4 flex-1  flex-wrap flex py-6">
            <label
              htmlFor="profile-image"
              className="block shrink-0 border-slate-700 overflow-hidden border rounded-full w-44 h-44"
            >
              <img
                src={profile || "/profile-placeholder.jpg"}
                alt="profile"
                className="w-full h-full object-cover  border"
              />
            </label>

            <input
              type="file"
              name="profile-image"
              id="profile-image"
              className="hidden"
              required
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFile(e, setProfile)}
            />

            <p className="px-6 mt-auto">Choose profile picture</p>
          </div>

          <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="fname"
                className="block text-slate-200 text-left mb-2 "
              >
                First name:
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
              />
            </div>
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="lname"
                className="block text-slate-200 text-left mb-2"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
              />
            </div>
          </section>

          <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="email"
                className="block text-slate-200 text-left mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
              />
            </div>
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="phone"
                className="block text-slate-200 text-left mb-2"
              >
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
              />
            </div>
          </section>

          <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="username"
                className="block text-slate-200 text-left mb-2"
              >
                User Name:
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
              />
            </div>

            <div className="mb-4 w-full md:w-auto flex-1">
              <label htmlFor="year" className="block text-slate-200 text-left mb-2">
                Password :
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent "
              />
            </div>
          </section>
          <div className="flex items-center justify-between">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 rounded-full hover:bg-blue-700 text-white  py-3 px-6 text-sm font-normal focus:outline-none focus:shadow-outline"
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
          </div>
          <span className="text-white  block cursor-pointer">
            Login
            <Link to={"/login"} className="text-sky-600 underline">
              {" "}
              here
            </Link>
          </span>
        </form>
      </main>
    </div>
  );
}

export default EnrollPage;
