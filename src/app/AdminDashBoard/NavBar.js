'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/src/context/AuthContext'

const AdminNavBar = ({ username }) => {
  const router = useRouter()

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          SEIS Admin
        </span>
      </div>

      <div className="navbar-center">
        <span className="text-lg text-gray-600">
          Welcome, <span className="font-semibold text-gray-900">{username}</span>
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

export default AdminNavBar
