'use client'
import { useState, useRef, useEffect } from 'react'
import '../globals.css'
import NavBar from './NavBar'
import Tabled from './tabled'
import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import getdocsbyuidseis from '@/src/firebase/firestore/getdocs'
import getdocsbyuidalerts from '@/src/firebase/firestore/getdocsalerts'

const UserDashboard = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  const eref = useRef([]) //id of enrolled courses
  const [en, seten] = useState(false)
  const [an, setan] = useState(false)
  const aref = useRef([]) // ids of alerted courses
  const isFirstRender = useRef(true)
  const [changed, setchanged] = useState(false)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      if (user != null) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            router.replace('/AdminDashBoard')
          } else {
            getdocsbyuidseis(user.uid).then((result, error) => {
              if (result && result.send.length > 0) {
                eref.current = result.send
                seten(true)
              }
              if (error) console.log(error)
            })
            getdocsbyuidalerts(user.uid).then((result, error) => {
              if (result && result.send.length > 0) {
                aref.current = result.send
                setan(true)
              }
              if (error) console.log(error)
            })
          }
        })
      } else {
        router.replace('/Login')
      }
    }
  }, [user, changed])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavBar pagename={'Student Dashboard'} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back! 👋
              </h1>
              <p className="text-gray-600">
                Manage your course enrollments and alerts from your dashboard
              </p>
            </div>
            <div className="hidden md:flex gap-4">
              <button
                className="btn btn-primary"
                onClick={() => router.push('/UserDashBoard/AddCourses')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Courses
              </button>
              <button
                className="btn btn-outline"
                onClick={() => router.push('/UserDashBoard/SetAlerts')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Set Alerts
              </button>
            </div>
          </div>
        </div>

        {/* Enrolled Courses Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Enrolled Courses</h2>
              <p className="text-gray-600">Courses you're currently enrolled in for this semester</p>
            </div>
          </div>

          {!en && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Courses Yet</h3>
              <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet. Start by adding some!</p>
              <button
                className="btn btn-primary"
                onClick={() => router.push('/UserDashBoard/AddCourses')}
              >
                Browse Courses
              </button>
            </div>
          )}

          {en && user != null && (
            <Tabled
              data={eref.current}
              rend={'courses'}
              setchanged={setchanged}
              uid={user.uid}
              changed={changed}
            />
          )}
        </div>

        {/* Course Alerts Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Course Alerts</h2>
              <p className="text-gray-600">Get notified about important course updates</p>
            </div>
          </div>

          {!an && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Alerts Set</h3>
              <p className="text-gray-500 mb-6">Set up alerts to stay informed about course updates</p>
              <button
                className="btn btn-outline"
                onClick={() => router.push('/UserDashBoard/SetAlerts')}
              >
                Set Up Alerts
              </button>
            </div>
          )}

          {an && user != null && (
            <Tabled
              data={aref.current}
              rend={'alerts'}
              setchanged={setchanged}
              uid={user.uid}
              changed={changed}
            />
          )}
        </div>
      </div>

      {changed && window.location.reload(false)}
    </div>
  )
}

export default UserDashboard
