import { StudentContext } from "../../Context/StudentContext";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import {
  Link,
  json,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";

function SelectPage() {
  const { student, setStudent } = useContext<any>(StudentContext);
  const navigate = useNavigate();
  const router = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student?._id) {
      navigate("/home");
    }
  }, [router.pathname, student?._id]);

  return (
    <div className="flex items-center justify-center h-screen bg-dark-500">
      <div
        className="w-fit "
      >
        <h4 className="text-xl md:text-2xl mb-12 lg:text-3xl py-4 text-white text-left font-bold">

        </h4>
        <section className="flex space-x-14">
          {
            [
              {
                title: 'Student',
                link: '/login',
                image: '/icons/coding.png'
              },
              {
                title: 'Faculty',
                link: '/faculty/login',
                image: '/icons/class.png'
              },
              {
                title: 'HOD',
                link: '/admin/login',
                image: '/icons/hod2.png'
              }
            ].map(({ link, title, image }) =>

              <Link
                key={title}
                to={link}
                className="aspect-square relative group transition h-64 bg-dark-400 text-white border flex flex-col justify-center items-center border-dark-200 hover:border-purple_pri-500 rounded-md"
              >
                <img className="aspect-square w-2/5" src={image} alt="choose option" />
                <p
                  className="text-xl font-bold pt-4 text-gray-500 group-hover:text-purple_pri-500 transition"
                >
                  {title}
                </p>
                <HiCheckCircle className="absolute bottom-4 right-4 text-2xl text-dark-200 transition  group-hover:text-purple_pri-500" />
              </Link>
            )
          }

        </section>
      </div>
    </div>
  );
}

export default SelectPage;
