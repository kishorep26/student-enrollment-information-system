'use client'
import {useState,useEffect,useRef} from 'react'
import '../../globals.css'
import NavBar from '../NavBar'
import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import getalldocs from '@/src/firebase/firestore/getalldocs'
import addDataseis from '@/src/firebase/firestore/adddata'
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
            getalldocs(user.uid).then((result, error) => {
              if (result) {
                console.log(result.send, 'heheh result at getdocsallbyuid')
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
      <NavBar pagename={'Add Courses'} />
      <br />
      <div className='prose flex items-center justify-center text-xl normal-case'>
        Search & Enroll into Courses using Class ID (You can Enroll into a
        maximum of 3 courses!)
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
            if (data !== '' && user != null) {
              addDataseis(user.uid, data).then((result, error) => {
                if (result) {
                  console.log(result, 'adddeddd hehehe')
                  setenrolled(true)
                  alert('enrollment successful')
                  router.replace('/UserDashBoard')
                }
              })
              console.log(data)
            } else {
              alert('You have reached Registration limit')
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
