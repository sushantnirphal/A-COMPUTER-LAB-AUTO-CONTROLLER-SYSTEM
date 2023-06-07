import useFaculties from '@/hooks/useFaculties'
import RootLayout from '@/partials/Layout'
import Loader from '@/partials/Loader'
import extractFormData from '@/utils/Extractform'
import React, { useState } from 'react'
import { HiUserAdd } from 'react-icons/hi'
import { toast } from 'react-toastify'

export default function Student() {
  const { fetching, refetch, faculties } = useFaculties();
  
  const [addForm, setAddForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const payload = extractFormData(event.currentTarget);
    console.log(payload);
    const req = await fetch(import.meta.env.VITE_SERVER_URL_API + '/faculty/enroll', {
      method: "post",
      body: new FormData(event.target as HTMLFormElement),
    });
    const res = await req.json();
    console.log(res);
    if (res.success) {
      toast("Faculty added successfully.", { type: 'success', position: 'top-right' });
      setLoading(false);
      setAddForm(false)
      refetch();
      event.currentTarget.reset()
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
        return toast("Please upload image file (.png, .jpeg, .jpg)", { type: 'error' });
      }
      if (file.size / 1000 > 500) {
        e.target.value = "";
        return toast("Please upload file under 500kb", { type: 'error' });
      }
      const reader = new FileReader();
      reader.readAsDataURL(file as File);
      reader.onload = () => {
        setter(reader.result as string);
      };
    }
  }
  return (
    <RootLayout>
      {
        addForm &&
        <div
          className='inset-0 fixed py-8 bg-purple_pri-500/40 backdrop-blur-sm backdrop-filter grid place-items-center'
        >
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-lg mb-2 w-11/12 max-w-[700px]  bg-dark-400"
          >
            <h2 className="text-xl  font-semibold text-purple_pri-500">
              Create faculty.
            </h2>

            <div className="items-center flex py-6">
              <label
                htmlFor="profile-image"
                className="block shrink-0  overflow-hidden border rounded-full w-24 h-24"
              >
                <img
                  src={profile || "/profile-placeholder.jpg"}
                  className="w-full h-full object-cover  "
                />
              </label>
              <label htmlFor="profile-image" className="px-6 cursor-pointer text-white">Choose profile picture</label>
              <input
                type="file"
                name="profile"
                id="profile-image"
                className="hidden"
                required
                accept=".jpg,.jpeg,.png"
                onChange={(e) => handleFile(e, setProfile)}
              />
            </div>

            <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
              <div className="mb-2 w-full md:w-auto flex-1">
                <label
                  htmlFor="fname"
                  className="block text-gray-300 font-medium text-sm mb-1"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  className="shadow appearance-none  focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
                />
              </div>
              <div className="mb-2 w-full md:w-auto flex-1">
                <label
                  htmlFor="lname"
                  className="block text-gray-300 font-medium text-sm mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  className="shadow appearance-none  focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
                />
              </div>
            </section>

            <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
              <div className="mb-2 w-full md:w-auto flex-1">
                <label
                  htmlFor="email"
                  className="block text-gray-300 font-medium text-sm mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow appearance-none  focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
                />
              </div>
              <div className="mb-2 w-full md:w-auto flex-1">
                <label
                  htmlFor="phone"
                  className="block text-gray-300 font-medium text-sm mb-1"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="shadow appearance-none  focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
                />
              </div>
            </section>

            <section className="flex flex-col sm:flex-row items-center space-x-0 md:space-x-4">
              <div className="mb-2 w-full md:w-auto flex-1">
                <label
                  htmlFor="branch"
                  className="block text-gray-300 font-medium text-sm mb-1"
                >
                  Branch
                </label>
                <input
                  list="branch-list"
                  type="text"
                  name="branch"
                  id="branch"
                  className="shadow appearance-none  focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
                />
                <datalist id="branch-list">
                  <option value="Computer Engineering"></option>
                  <option value="Information Technology"></option>
                  <option value="AIDS"></option>
                </datalist>
              </div>

              <div className="mb-2 w-full md:w-auto flex-1">
                <label
                  htmlFor="year"
                  className="block text-gray-300 font-medium text-sm mb-1"
                >
                  Year
                </label>
                <input
                  list="year-list"
                  type="text"
                  name="year"
                  id="year"
                  className="shadow appearance-none  focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
                />
                <datalist id="year-list">
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
                  <option value="4"></option>
                </datalist>
              </div>
              <div className="mb-2 w-full md:w-auto flex-1">
                <label
                  htmlFor="semester"
                  className="block text-gray-300 font-medium text-sm mb-1"
                >
                  Semester
                </label>
                <input
                  list="semester-list"
                  type="text"
                  name="semester"
                  id="semester"
                  className="shadow appearance-none  focus:border-sky-600 rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline bg-transparent border border-slate-300"
                />
                <datalist id="semester-list">
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
                  <option value="4"></option>
                  <option value="5"></option>
                  <option value="6"></option>
                  <option value="7"></option>
                  <option value="8"></option>
                </datalist>
              </div>
            </section>
            <section className="flex items-center space-x-0 md:space-x-4">
            </section>
            <div className="flex items-center justify-between">
              <button
                disabled={loading}
                type="submit"
                className="bg-purple_pri-500 rounded-full hover:bg-purple_pri-600 text-white  py-2 px-6 text-sm font-normal focus:outline-none focus:shadow-outline"
              >
                {loading ? "Please wait..." : "Enroll now"}
              </button>
            </div>

          </form>
        </div>
      }
      <section
        className='p-16'
      >
        <button
          onClick={() => setAddForm(!addForm)}
          className='text-white group hover:bg-purple_pri-600  h-8 transition bg-purple_pri-500 rounded-full flex items-center space-x-2 absolute bottom-12 right-10 ring-1  px-4'
        >
          <p
            className='text-sm'
          >
            Add Faculty</p> <HiUserAdd />
        </button>
        {
          fetching && <Loader />
        }

        {
          !faculties?.length &&
          <main
            className='w-11/12 max-w-[400px] first-letter: py-3 px-5 text-white rounded-lg my-4 bg-red-500'
          >
            <h3> No students found</h3>

          </main>
        }
        {
          faculties && faculties.map(({ _id, email, name, prn, semester, year, profile, ...item }) =>
            <div
              key={_id}
              className="text-white max-w-[700px] mb-2 cursor-pointer items-center border border-dark-200 bg-dark-400  px-6 pt-3 rounded-md">
              <main
                className='flex items-center justify-between'
              >
                {/* <pre>
                  { JSON.stringify(item,null,4)}
                </pre> */}
                <div>
                  <h4 className="text-sm pt-2">Name: {name}</h4>
                  <h4 className="text-sm pt-2">Name: {email}</h4>
                  <div className="text-sm  py-3 shrink-0 flex">
                    <div
                      className="flex  text-xs space-x-2"
                    >
                      <h4>Sem {semester}</h4>
                      <span>|</span>
                      <p>Year : {year || 'NAN'}</p>
                    </div>
                    <div className="ml-auto items-center flex space-x-4">

                    </div>
                  </div>
                </div>
                <img
                  className='w-16 h-16 rounded-full'
                  src={profile} alt={profile} />

              </main>
            </div>
          )
        }
      </section>
    </RootLayout>
  )
}
