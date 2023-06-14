import RootLayout from "@/partials/Layout";
import { StudentContext } from "../../Context/StudentContext";
import React, { useContext } from "react";

const Profile = () => {
  const { student, setStudent } = useContext<any>(StudentContext);
  const isStudent = student?.role === "student";
  return (
    <RootLayout>
      <div className="ml-12 p-12 text-white  space-y-1">
        <img
          className="rounded-full  mb-12 w-40 h-40 border border-dashed p-2"
          src={student?.profile}
          alt=""
        />

        <h5>Full name : {student?.name}</h5>
        {isStudent ? (
          <>
            <h5>PRN : {student?.prn}</h5>
            <div className="flex space-x-4">
              <h5>Branch : {student?.branch}</h5>
              <h5>Year : {student?.year}</h5>
            </div>
            <p>Lives at : {student?.address}</p>
          </>
        ) : null}

        <h5>Email : {student?.email}</h5>
        <h5>Phone number : {student?.phone}</h5>
        <h5>Year : {student?.year}</h5>
        <h5>Sem : {student?.semester}</h5>


        {/* <pre>
          {
            JSON.stringify(student, null, 4)
          }
        </pre> */}
      </div>
    </RootLayout>
  );
};

export default Profile;
