import React, { useEffect, useState } from 'react'

import { StudentType } from 'interfaces/student';

export default function useFaculties() {
  const [fetching, setFetching] = useState(true);
  const [faculties, setfaculties] = useState<StudentType[] | null>(null);
  function fetch_faculties() {
    setFetching(true)
    fetch(
      `${import.meta.env.VITE_SERVER_URL_API}/faculty/` as string
    )
      .then((d) => d.json())
      .then((e) => {
        setfaculties(e.data);
        setFetching(false)
      }
      );
  }
  useEffect(() => { fetch_faculties() }, [])
  return (
    {
      fetching, faculties, refetch: fetch_faculties
    }
  )
}
