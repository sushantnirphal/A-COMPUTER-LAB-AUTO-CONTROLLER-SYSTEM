import React, { useEffect, useState } from 'react'

import { StudentType } from 'interfaces/student';

export default function useStudents() {
  const [fetching, setFetching] = useState(true);
  const [students, setStudents] = useState<StudentType[] | null>(null);
  function fetch_students() {
    setFetching(true)
    fetch(
      `${import.meta.env.VITE_SERVER_URL_API}/student/` as string
    )
      .then((d) => d.json())
      .then((e) => {
        setStudents(e.data);
        setFetching(false)
      }
      );
  }
  useEffect(() => { fetch_students() }, [])
  return (
    {
      fetching, students, refetch: fetch_students
    }
  )
}
