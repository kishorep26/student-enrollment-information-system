'use client'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
const NavBar = ({ pagename }) => {
  const router = useRouter()
  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-circle btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h7'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow'
          >
            <li
              className=' text-md btn btn-ghost normal-case'
              onClick={(e) => router.replace('/UserDashBoard')}
            >
              DashBoard
            </li>
            <li
              className=' text-md btn btn-ghost normal-case'
              onClick={(e) => router.replace('/UserDashBoard/AddCourses')}
            >
              Add Courses
            </li>
            <li
              className=' text-md btn btn-ghost normal-case'
              onClick={(e) => router.replace('/UserDashBoard/SetAlerts')}
            >
              Set Alerts
            </li>
          </ul>
        </div>
      </div>
      <div className='navbar-center flex-none'>
        <a className='text-xl normal-case'>{pagename}</a>
      </div>
      <div
        className='navbar-end flex-none'
        onClick={() => {
          console.log('logout')
          signOut(auth)
            .then(() => {
              // Sign-out successful.
              router.replace('/Login')
              console.log('Signed out successfully')
            })
            .catch((error) => {
              // An error happened.
            })
        }}
      >
        <label tabIndex={0} className='btn btn-circle btn-ghost'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8v-1Z'
            />
          </svg>
        </label>
      </div>
    </div>
  )
}

export default NavBar
