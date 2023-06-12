import React, { useEffect, useState } from 'react'
import { base_url } from '../partials/code/Welcome'
export interface Practical {
  aim: string,
  _id: string,
  file: string,
  subject: string,
  file_type: string,
  year: number,
  semester: number
  manual: {
    url: string,
    uploaded_on: string
  }
  practical_no: number
  test_case: { input: string, output: string }[]
}

export interface StudentPracticalType {
  _id: string;
  aim: string;
  semester: number;
  year: number;
  slug: string;
  file: string;
  file_type: string;
  practical_no: string
  manual: { url: string, uploaded_on: string }
}
export default function usePracticals({ year, sem }: { year: number, sem: number }) {
  const [fetching, setFetching] = useState(true);
  const [practicals, setPracticals] = useState<Practical[] | null>(null);
  function fetch_practicals() {
    setFetching(true)
    fetch(
      `${base_url}/manual/all_id/${year}/${sem}` as string
    )
      .then((d) => d.json())
      .then((e) => {
        setPracticals(e.data);
        setFetching(false)
      }
      );
  }
  useEffect(() => { fetch_practicals() }, [])
  return (
    {
      fetching, practicals, refetch: fetch_practicals
    }
  )
}


export function useMyPracticals() {

}