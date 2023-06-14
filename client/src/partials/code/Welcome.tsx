import usePracticals from "@/hooks/usePracticals";
import { StudentContext } from "../../../Context/StudentContext";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { HiCheck, HiCheckCircle, HiClock, HiMinusCircle, HiTerminal } from 'react-icons/hi'
import Loader from "../Loader";
import { toast } from "react-toastify";
export const base_url: string = import.meta.env.VITE_SERVER_URL
const Welcome = ({ id, setter }: { id: string | null, setter: Dispatch<SetStateAction<string | null>> }) => {
  const { student, setStudent, update_student } = useContext<any>(StudentContext);
  const { year, semester: sem } = student || {}
  const { fetching, practicals, refetch } = usePracticals({ sem, year });
  const days_window = 6;
  const is_missed_practical = (date: string) => {

    const diff = new Date().getTime() - new Date(date).getTime();
    return (diff >= 24 * 60 * 60 * 1000 * days_window) && diff > 0;

  }
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
            <p className="text-sm text-gray-400">Students will get window of 7 days to complete practical from the practical slot date.</p>
          </div>
      }
      <main
        className="flex py-8 w-full flex-wrap justify-start"
      >
        {
          practicals?.map((item: any) => {
            const isCompleted = !!student?.practical_completed.find((i: any) => (i.practical_no === item?.practical_no) && (i.aim === item?.aim));
            const isMissed = is_missed_practical(item.slot_date);
            const is_open = new Date(item.slot_date).getTime() <= new Date().getTime() && !isMissed;
            return (<article
              key={item?._id}
              onClick={() => {
                if (isMissed) return toast('Submission not allowed for this practical, as you\'ve missed deadline.', { type: 'warning', })
                if (!is_open && !isCompleted) return toast(`You can\'t open this, Practical is scheduled for ${new Date(item.slot_date).toLocaleString('en-in', { dateStyle: 'full' })}`, { type: 'warning', })
                setter(item?._id)
              }}
              className={`
              w-full relative md:w-[32%] cursor-pointer shadow-xl hover:shadow-purple_pri-600/10 group border 
              ${isCompleted ? 'border-green-500 hover:bg-green-500/10 hover:border-green-500 hover:text-green-400'
                  : isMissed
                    ? 'hover:text-red-600 border-red-500 hover:bg-red-500/20 hover:border-red-500'
                    : 'hover:text-purple_pri-600 border-dark-200 hover:bg-purple_pri-500/20 hover:border-purple_pri-500'
                }
                transition mr-[1%] mb-4 rounded-md p-4 bg-dark-400 `}
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
                  <br />
                  Scheduled for: {new Date(item?.slot_date).toLocaleString('en-us', { dateStyle: 'full' })}
                </p>
              </div>
              {
                isCompleted
                  ? <HiCheckCircle className="text-green-500 absolute bottom-4 right-4" />
                  : null
              }
              {
                isMissed
                  ? <HiMinusCircle className="text-red-500 absolute bottom-4 right-4" />
                  : null
              }
              {
                is_open && !isCompleted
                  ? <HiClock className="text-green-500 absolute bottom-4 right-4" />
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
