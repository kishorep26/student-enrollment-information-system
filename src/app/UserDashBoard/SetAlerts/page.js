'use client'
import '../../globals.css'
import NavBar from '../NavBar'
import { useState,useRef,useEffect } from 'react'
import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import addDataalerts from '@/src/firebase/firestore/adddataalerts'
import getalldocsalerts from '@/src/firebase/firestore/getalldocsalerts'
const page = () => {
  const [data, setdata] = useState('')
  const { user } = useAuthContext()
  const router = useRouter()
  const opts = useRef([])
  const isFirstRender = useRef(true)
  const [op, setop] = useState(false)
  const [enrolled, setenrolled] = useState(false)
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
                console.log(
                  result.send,
                  'heheh result at alerts getdocsallbyuid'
                )
                count.current = result.send.pop()
                opts.current = result.send
                setop(true)
                if (count.current >= 3) {
                  alert('MAX REGISTRATION REACHED')
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
    <div>
      <NavBar pagename={'Set Alerts'} />
      <br />
      <div className='prose flex items-center justify-center text-xl normal-case'>
        Search & Setup Alerts using Class ID (You can setup a maximum of 3
        ALerts!)
      </div>
      <br />
      <br />
      <div className='join prose flex items-center justify-center text-xl normal-case'>
        <select
          className='select join-item select-bordered w-full max-w-xs'
          defaultValue={'Choose a Course'}
          onChange={(e) => setdata(e.target.value)}
        >
          <option disabled>Choose a Course</option>
          {op &&
            opts.current.map((ele) => {
              return <option key={ele}> {ele}</option>
            })}
        </select>
        <button
          className='btn join-item rounded-r-full'
          onClick={(e) => {
            if (data !== '') {
              addDataalerts(user.uid, data).then((result, error) => {
                if (result) {
                  setenrolled(true)
                  alert('enrollment successful')
                  router.replace('/UserDashBoard')
                }
              })
            } else {
              alert('You have reached Alert Registration limit')
              router.replace('/UserDashBoard')
            }
          }}
        >
          Enroll
        </button>
      </div>
      <br />
      <br />
      <div className='prose flex items-center justify-center text-xl normal-case'>
        {enrolled && <p>Enrolled into '{data}'</p>}
      </div>
    </div>
  )
}

export default page
