import React from 'react'
import { FaSpinner } from 'react-icons/fa'

function Loader() {
  return (
    <div
      className="text-white mb-4 justify-between bg-purple_pri-500/10 py-4 px-4 rounded-lg w-11/12 max-w-[400px] flex items-center"
    >
      <h5>
        Please wait...
      </h5>
      <FaSpinner className="animate-spin ml-4" />
    </div>
  )
}

export default Loader