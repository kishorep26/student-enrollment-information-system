'use client'
import '../../globals.css'
import NavBar from '../NavBar'
import { useState, useRef, useEffect } from 'react'
import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import addDataalerts from '@/src/firebase/firestore/adddataalerts'
import getalldocsalerts from '@/src/firebase/firestore/getalldocsalerts'

const SetAlerts = () => {
  const [data, setdata] = useState('')
  const { user } = useAuthContext()
  const router = useRouter()
  const opts = useRef([])
  const isFirstRender = useRef(true)
  const [op, setop] = useState(false)
  const [enrolled, setenrolled] = useState(false)
  const [loading, setLoading] = useState(false)
  const count = useRef(0)

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender.current = false
      if (user != null) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            router.replace('/AdminDashBoard')
          } else {
            getalldocsalerts(user.uid).then((result, error) => {
              if (result) {
                count.current = result.send.pop()
                opts.current = result.send
                setop(true)
                if (count.current >= 3) {
                  alert('MAX ALERT REGISTRATION REACHED')
                  router.replace('/UserDashBoard')
                }
              }
              if (error) console.log(error)
            })
          }
        })
      } else {
        router.replace('/Login')
      }
    }
  }, [user, enrolled])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <NavBar pagename={'Set Alerts'} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Set Course Alerts</h1>
              <p className="text-gray-600">Get notified about important course updates</p>
            </div>
          </div>

          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>You can set up alerts for a maximum of 3 courses. Currently active: {count.current}/3</span>
          </div>
        </div>

        {/* Alert Selection Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Course for Alerts</h2>

          <div className="space-y-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Available Courses</span>
                <span className="label-text-alt">{opts.current.length} courses available</span>
              </label>
              <select
                className="select select-bordered w-full focus:select-primary"
                defaultValue={'Choose a Course'}
                onChange={(e) => setdata(e.target.value)}
              >
                <option disabled>Choose a Course</option>
                {op &&
                  opts.current.map((ele) => {
                    return <option key={ele}>{ele}</option>
                  })}
              </select>
            </div>

            <button
              className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
              onClick={(e) => {
                if (data !== '' && data !== 'Choose a Course') {
                  setLoading(true)
                  addDataalerts(user.uid, data).then((result, error) => {
                    if (result) {
                      setenrolled(true)
                      alert('Alert setup successful!')
                      router.replace('/UserDashBoard')
                    } else {
                      setLoading(false)
                      alert('Alert setup failed. Please try again.')
                    }
                  })
                } else if (data === '' || data === 'Choose a Course') {
                  alert('Please select a course first')
                } else {
                  alert('You have reached the alert registration limit')
                  router.replace('/UserDashBoard')
                }
              }}
              disabled={loading}
            >
              {loading ? 'Setting Up Alert...' : 'Set Up Alert'}
            </button>

            {enrolled && (
              <div className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Successfully set up alert for '{data}'</span>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="font-semibold text-gray-900 mb-3">What are Course Alerts?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Get notified about course schedule changes
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Receive updates about enrollment deadlines
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Stay informed about important announcements
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Manage alerts from your dashboard
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SetAlerts
