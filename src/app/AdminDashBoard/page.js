'use client'
import { useState, useEffect, useRef } from 'react'
import '../globals.css'
import NavBar from './NavBar'
import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import LineGraph from './LineGraph'
import getsummaire from '@/src/firebase/firestore/getsummaire'
import getalldocssummaire from '@/src/firebase/firestore/getalldocssummaire'

const AdminDashboard = () => {
  const [data, setdata] = useState('')
  const [vdata, setvdata] = useState(null)
  const { user } = useAuthContext()
  const [ac, setac] = useState(false)
  const router = useRouter()
  const opts = useRef([])
  const isFirstRender = useRef(true)
  const [op, setop] = useState(false)

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender.current = false
      if (user != null) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            setac(true)
            getalldocssummaire().then((result, error) => {
              setop(true)
              opts.current = result.send
            })
          } else {
            setac(false)
            alert('Not Authorized')
            router.replace('/UserDashBoard')
          }
        })
      } else {
        router.replace('/Login')
      }
    }
  }, [user])

  return (
    ac && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <NavBar username={'Admin'} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600">
                  Visualize enrollment trends and track course performance
                </p>
              </div>
              <div className="hidden md:block">
                <div className="stats shadow bg-white/80">
                  <div className="stat">
                    <div className="stat-title">Total Courses</div>
                    <div className="stat-value text-primary">{opts.current.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Selection Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Select Course to Visualize</h2>
                <p className="text-gray-600">Choose a course to view enrollment trends over time</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="form-control w-full md:flex-1">
                <label className="label">
                  <span className="label-text font-medium">Course</span>
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
                className="btn btn-primary md:w-auto w-full"
                onClick={(e) => {
                  if (data && data !== 'Choose a Course') {
                    getsummaire(data).then((result, error) => {
                      setvdata(result.data)
                    })
                  } else {
                    alert('Please select a course first')
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Visualize Data
              </button>
            </div>
          </div>

          {/* Visualization Section */}
          {data && data != '' && vdata ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Enrollment Trends: {data}
                </h2>
                <p className="text-gray-600">Daily enrollment count over time</p>
              </div>
              <LineGraph
                data={Object.entries(
                  Object.keys(vdata)
                    .sort()
                    .reduce(function (result, key) {
                      result[key] = vdata[key]
                      return result
                    }, {})
                )}
              />
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-white/20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Data Selected</h3>
              <p className="text-gray-500">Select a course above to view enrollment analytics</p>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default AdminDashboard
