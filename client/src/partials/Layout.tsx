import React, { ReactNode } from 'react'
import Header from './Header'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
function RootLayout({ children }: { children: ReactNode }) {
  return (
    <section
      className='flex w-screen overflow-y-auto h-screen bg-dark-500'
    >
     <ToastContainer  pauseOnHover theme='dark' />
      <aside
        className='w-3/12 lg:w-2/12 sticky top-0  h-full border-r border-dark-200 shadow-2xl shadow-dark-600'
      >
        <Header />
      </aside>
      <main
        className='w-9/12 lg:w-10/12'
      >
        {children}
      </main>
    </section>
  )
}

export default RootLayout