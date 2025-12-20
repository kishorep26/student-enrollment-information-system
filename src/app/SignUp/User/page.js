'use client'
import '../../globals.css'
import signUp from '@/src/firebase/signup'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/src/context/AuthContext'
import { useAuthContext } from '@/src/context/AuthContext'
import Link from 'next/link'

const UserSignUp = () => {
  const [uname, setuname] = useState('')
  const [pass, setpass] = useState('')
  const [cpass, setcpass] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user } = useAuthContext()

  useEffect(() => {
    if (user != null) {
      user.getIdTokenResult().then((idTokenResult) => {
        if (idTokenResult.claims.admin) {
          router.replace('/AdminDashBoard')
        } else {
          router.replace('/UserDashBoard')
        }
      })
    }
  }, [user])

  const gsignin = (e) => {
    const provider = new GoogleAuthProvider()
    auth.useDeviceLanguage()
    setLoading(true)
    signInWithPopup(auth, provider)
      .then((result) => {
        router.replace('/UserDashBoard')
      })
      .catch((error) => {
        alert(error.message)
        setLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link href="/SignUp" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Account Selection
        </Link>

        {/* Signup Card */}
        <div className="card bg-white shadow-2xl">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Student Sign Up
              </h2>
              <p className="text-gray-600">Create your student account</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              {/* Email Input */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full focus:input-primary"
                  onChange={(e) => setuname(e.target.value)}
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
              </div>

              {/* Password Input */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                  <span className="label-text-alt text-gray-500">Min. 8 characters</span>
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="input input-bordered w-full focus:input-primary"
                  onChange={(e) => setpass(e.target.value)}
                  required
                  pattern=".{8,}"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-medium">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  className="input input-bordered w-full focus:input-primary"
                  onChange={(e) => setcpass(e.target.value)}
                  required
                  pattern=".{8,}"
                />
              </div>

              {/* Sign Up Button */}
              <button
                className={`btn btn-primary w-full mb-4 ${loading ? 'loading' : ''}`}
                onClick={async (e) => {
                  if (uname.length >= 0 && pass.length >= 8 && cpass === pass) {
                    e.preventDefault()
                    setLoading(true)
                    const { result, error } = await signUp(uname, pass)
                    if (error) {
                      alert('Error creating account: ' + error.message)
                      setLoading(false)
                      return console.log(error)
                    }
                    return router.replace('/UserDashBoard')
                  } else if (cpass !== pass) {
                    e.preventDefault()
                    alert('Passwords do not match')
                  }
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Student Account'}
              </button>

              {/* Divider */}
              <div className="divider">OR</div>

              {/* Google Sign Up */}
              <button
                className="btn btn-outline w-full gap-2"
                onClick={(e) => gsignin(e)}
                type="button"
                disabled={loading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75s9.75-4.366 9.75-9.75a10.2 10.2 0 0 0-.19-1.946a.75.75 0 0 0-.735-.604H12a.75.75 0 0 0-.75.75v3.6c0 .414.336.75.75.75h3.883a4.68 4.68 0 0 1-1.05 1.132h-.002l.002.002A4.616 4.616 0 0 1 12 16.65a4.65 4.65 0 0 1 0-9.3c1.184 0 2.26.446 3.084 1.178a.75.75 0 0 0 1.029-.03l2.545-2.546a.75.75 0 0 0-.019-1.079A9.708 9.708 0 0 0 12 2.25Zm3.202 15a6.148 6.148 0 0 1-8.573-2.252L4.952 16.29A8.246 8.246 0 0 0 12 20.25c1.821 0 3.505-.59 4.87-1.59l-1.668-1.41Zm2.803.406A8.221 8.221 0 0 0 20.25 12c0-.348-.023-.704-.065-1.05H12.75v2.1h4.336a.75.75 0 0 1 .707 1a6.166 6.166 0 0 1-1.397 2.245l1.61 1.361ZM5.02 7.601A8.244 8.244 0 0 1 12 3.75c1.892 0 3.63.642 5.023 1.716l-1.5 1.5A6.105 6.105 0 0 0 12 5.85a6.147 6.147 0 0 0-5.281 2.997l-1.7-1.246Zm-.69 1.354A8.227 8.227 0 0 0 3.75 12a8.23 8.23 0 0 0 .53 2.914l1.767-1.362A6.16 6.16 0 0 1 5.85 12c0-.606.088-1.192.251-1.746l-1.77-1.299Z"
                    clipRule="evenodd"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/Login" className="text-primary font-semibold hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm text-gray-600 font-medium mb-2">As a student, you can:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Enroll in up to 3 courses
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Set up course alerts
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Track your enrollment status
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UserSignUp
