import usePracticals from "@/hooks/usePracticals";
import { StudentContext } from "../../../Context/StudentContext";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { HiCheck, HiCheckCircle } from 'react-icons/hi'
import Loader from "../Loader";
export const base_url: string = import.meta.env.VITE_SERVER_URL
const Welcome = ({ id, setter }: { id: string | null, setter: Dispatch<SetStateAction<string | null>> }) => {
  const { student, setStudent, update_student } = useContext<any>(StudentContext);
  const { year, semester: sem } = student || {}
  const { fetching, practicals, refetch } = usePracticals({ sem, year })
  return (

    <div className="p-6 md:p-6 h-full overflow-y-auto text-slate-100 w-full">
      <main className="text-2xl md:text-6xl leading-14 py-12   text-gr bg-clip-text text-transparent font-black">
        <h2> Welcome to CodeX </h2>
        <h2
          className="capitalize"
        >
          {student?.name}.
        </h2>
      </main>
      {
        fetching ? <Loader />

          :
          <div className="border-t-2 border-t-dark-200 pt-2 ">
            <h1 className="font-bold text-2xl">List  of Practicals you have to Perform.</h1>
          </div>
      }
      <main
        className="flex py-8 w-full flex-wrap justify-start"
      >
        {
          practicals?.map((item: any) => {
            const isCompleted = !!student?.practical_completed.find((i: any) => i.practical_no === item?.practical_no)
            return (<article
              key={item?._id}
              onClick={() => !isCompleted && setter(item?._id)}
              className={`w-full relative md:w-[32%] cursor-pointer shadow-xl hover:shadow-purple_pri-600/10 group border ${isCompleted ? 'border-green-500 hover:bg-green-500/10 hover:border-green-500 hover:text-green-400' : 'hover:text-purple_pri-600 border-dark-200 hover:bg-purple_pri-500/20 hover:border-purple_pri-500'}  transition mr-[1%] mb-4 rounded-md p-4 bg-dark-400 `}
            >
              <p
                className="text-sm  font-semibold"
              >
                {(`${item?.practical_no}`.padStart(2, '0'))}) {item?.aim}
              </p>
              <div
                className="text-xs py-2 "
              >
                <p>
                  Posted on : {new Date(item?.createdAt).toLocaleString('en-us', { dateStyle: 'full' })}
                </p>
              </div>
              {
                isCompleted
                  ? <HiCheckCircle className="text-green-500 absolute bottom-4 right-4" />
                  : null
              }
            </article>)
          }
          )
        }
      </main>
    </div>

  );
};

export default Welcome;
