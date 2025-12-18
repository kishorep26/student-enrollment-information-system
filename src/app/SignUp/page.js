'use client'
import '../globals.css'
import {useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/src/context/AuthContext'
const Login = () => {
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
  return (
    <>
      <div className='flex h-screen flex-col items-center justify-center'>
        <Link href='/SignUp/User' replace={true} prefetch={true}>
          <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
            Signup As User
          </button>
        </Link>
        <br />
        <br />
        <Link href='/SignUp/Admin' replace={true} prefetch={true}>
          <button className='btn btn-xs sm:btn-sm md:btn-md lg:btn-lg'>
            Signup As Admin
          </button>
        </Link>
      </div>
    </>
  )
}

export default Login
