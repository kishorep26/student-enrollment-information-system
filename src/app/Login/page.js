'use client'
import '../globals.css'
import { useEffect } from 'react'
import signIn from '@/src/firebase/signin'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/src/context/AuthContext'
import { useAuthContext } from '@/src/context/AuthContext'
import Link from 'next/link'

const Login = () => {
  const [uname, setuname] = useState('')
  const [pass, setpass] = useState('')
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
        {/* Back to Home */}
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        {/* Login Card */}
        <div className="card bg-white shadow-2xl">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
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
              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                  <span className="label-text-alt text-gray-500">Min. 8 characters</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full focus:input-primary"
                  onChange={(e) => setpass(e.target.value)}
                  required
                  pattern=".{8,}"
                />
              </div>

              {/* Login Button */}
              <button
                className={`btn btn-primary w-full mb-4 ${loading ? 'loading' : ''}`}
                onClick={async (e) => {
                  if (uname.length >= 0 && pass.length >= 8) {
                    e.preventDefault()
                    setLoading(true)
                    const { result, error } = await signIn(uname, pass)
                    if (error) {
                      alert('Invalid credentials')
                      setLoading(false)
                      return console.log(error)
                    }
                    return router.replace('/UserDashBoard')
                  }
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="divider">OR</div>

              {/* Google Sign In */}
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

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link href="/SignUp" className="text-primary font-semibold hover:underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>🔒 Your information is secure and encrypted</p>
        </div>
      </div>
    </div>
  )
}

export default Login
