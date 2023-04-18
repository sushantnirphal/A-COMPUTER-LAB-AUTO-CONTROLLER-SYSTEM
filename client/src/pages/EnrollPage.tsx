import extractFormData from "@/utils/Extractform";
import {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";
function EnrollPage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const payload = extractFormData(event.currentTarget);
    console.log(payload);
    const req = await fetch("http://localhost:7890/student/enroll", {
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
    if (e.target.files) {
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
      <main className="gr-bg py-12">
        <form
          onSubmit={handleSubmit}
          className=" p-12 rounded-lg mb-4 w-11/12 max-w-[700px] mx-auto"
        >
          <h2 className="text-xl  font-semibold text-white py- text-center">
            Student enroll form
          </h2>

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
            <label htmlFor="profile-image" className="px-6 cursor-pointer mt-auto text-white">Choose profile picture</label>
          </div>

          <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="fname"
                className="block text-gray-300 font-bold mb-2"
              >
                First name:
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
              />
            </div>
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="lname"
                className="block text-gray-300 font-bold mb-2"
              >
                Last Name:
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
              />
            </div>
          </section>

          <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="email"
                className="block text-gray-300 font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
              />
            </div>
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="phone"
                className="block text-gray-300 font-bold mb-2"
              >
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
              />
            </div>
          </section>

          <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="branch"
                className="block text-gray-300 font-bold mb-2"
              >
                Branch:
              </label>
              <input
                list="branch-list"
                type="text"
                name="branch"
                id="branch"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
              />
              <datalist id="branch-list">
                <option value="Computer Engineering"></option>
                <option value="Information Technology"></option>
                <option value="AIDS"></option>
              </datalist>
            </div>

            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="year"
                className="block text-gray-300 font-bold mb-2"
              >
                Year:
              </label>
              <input
                list="year-list"
                type="text"
                name="year"
                id="year"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
              />
              <datalist id="year-list">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
              </datalist>
            </div>
          </section>

          <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="prn"
                className="block text-gray-300 font-bold mb-2"
              >
                PRN:
              </label>
              <input
                type="text"
                name="prn"
                id="prn"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
              />
            </div>

            <div className="mb-4 w-full md:w-auto flex-1">
              <label
                htmlFor="dob"
                className="block text-gray-300 font-bold mb-2"
              >
                DOB:
              </label>
              <input
                type="date"
                placeholder=""
                name="dob"
                id="dob"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
              />
            </div>
          </section>

          <section className="flex items-center space-x-0 md:space-x-4">
            <div className="mb-4 w-full md:w-auto flex-1">
              <label className="block text-gray-300 font-bold mb-2">
                Address:
              </label>
              <textarea
                placeholder="Enter address..."
                name="address"
                className="shadow appearance-none border-slate-600 border-2 focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
              />
            </div>
          </section>
          <div className="flex items-center justify-between">
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-500 rounded-full hover:bg-blue-700 text-white  py-3 px-6 text-sm font-normal focus:outline-none focus:shadow-outline"
            >
              {loading ? "Please wait..." : "Enroll now"}
            </button>
          </div>
          <span className="text-white py-3   block cursor-pointer">
            Already have an account,
            <Link to={"/login"} className="text-sky-600 underline">
              {" "}
              Login here
            </Link>
          </span>
        </form>
      </main>
    </div>
  );
}

export default EnrollPage;
