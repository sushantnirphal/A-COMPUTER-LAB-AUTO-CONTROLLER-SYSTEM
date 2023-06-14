import useStudents from '@/hooks/useStudents'
import RootLayout from '@/partials/Layout'
import Loader from '@/partials/Loader'
import extractFormData from '@/utils/Extractform'
import { StudentType } from 'interfaces/student'
import React, { useState } from 'react'
import { HiUserAdd } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export function Trash() {

  const { fetching, refetch, students } = useStudents({ trashed: true });

  async function restore_student(_id: string) {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL_API}/student/restore/${_id}`, { method: 'delete' })
    const akg = await res.json()
    toast(akg.message, { type: 'info', theme: 'light', });
    refetch();
  }
  return (
    <RootLayout>

      <section
        className='p-16'
      >

        {
          fetching && <Loader />
        }

        {
          !students?.length ?
            <main
              className='w-11/12 max-w-[400px] first-letter: py-3 px-5 text-white rounded-lg my-4 bg-red-500'
            >
              <h3> No students found</h3>

            </main>
            :
            <main
              className='w-11/12 max-w-[400px] first-letter: py-3 px-5 text-white rounded-lg my-4 bg-purple_pri-500'
            >
              <h3> All students in trash</h3>

            </main>
        }


        {
          students && students.map(({ _id, email, name, prn, semester, year, profile, ...item }: StudentType) =>
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

                  <h4 className="text-sm font-medium ">PRN: {prn}</h4>
                  <h4 className="text-xs pt-2">Name: {name}</h4>
                  <h4 className="text-xs pt-2">Email: {email}</h4>
                  <div className="text-xs  py-3 shrink-0 flex">

                    <button
                      onClick={e => {
                        if (confirm(`Are you sure to delete profile of ${name}`)) {
                          restore_student(_id)
                        }
                      }}
                      className='rounded-full px-4 py-1 text-[10px] text-white bg-green-600'
                    >
                      Restore
                    </button>
                  </div>
                </div>
                <main>
                  <img
                    className='w-16 h-16 rounded-full'
                    src={profile}
                    alt={profile}
                  />

                </main>

              </main>
            </div>
          )
        }
      </section >
    </RootLayout >
  )
}

