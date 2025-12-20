'use client'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'

const NavBar = ({ pagename }) => {
  const router = useRouter()

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-56 bg-white p-2 shadow-xl border border-gray-100"
          >
            <li>
              <a
                className="text-md hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                onClick={(e) => router.replace('/UserDashBoard')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </a>
            </li>
            <li>
              <a
                className="text-md hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                onClick={(e) => router.replace('/UserDashBoard/AddCourses')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Courses
              </a>
            </li>
            <li>
              <a
                className="text-md hover:bg-blue-50 hover:text-blue-600 rounded-lg"
                onClick={(e) => router.replace('/UserDashBoard/SetAlerts')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Set Alerts
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {pagename}
        </span>
      </div>

      <div className="navbar-end">
        <button
          className="btn btn-ghost btn-circle tooltip tooltip-left"
          data-tip="Logout"
          onClick={() => {
            signOut(auth)
              .then(() => {
                router.replace('/Login')
              })
              .catch((error) => {
                console.error('Logout error:', error)
              })
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-gray-600 hover:text-red-600"
          >
            <path
              fill="currentColor"
              d="M5 3h6a3 3 0 0 1 3 3v4h-1V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4h1v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3m3 9h11.25L16 8.75l.66-.75l4.5 4.5l-4.5 4.5l-.66-.75L19.25 13H8v-1Z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default NavBar
