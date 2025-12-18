'use client'
import {useState,useRef,useEffect} from 'react'
import '../globals.css'
import NavBar from './NavBar'
import Tabled from './tabled'
import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import getdocsbyuidseis from '@/src/firebase/firestore/getdocs'
import getdocsbyuidalerts from '@/src/firebase/firestore/getdocsalerts'
const page = () => {
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
    <div>
      <NavBar pagename={'DashBoard'} />
      <br />
      <div className='prose flex items-center justify-center text-xl normal-case'>
        {' '}
        Welcome to your DashBoard Utilize the NavBar Above to Navigate
        <br />
        <br />
      </div>
      <div className='prose flex items-center justify-center text-xl normal-case'>
        Your Enrollment For the Upcoming Semester:
      </div>
      <br />
      {!en && (
        <p className='prose flex items-center justify-center text-xl normal-case'>
          {' '}
          Looks like you have not enrolled into any classes yet!
        </p>
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
      <br />
      <br />
      <div className='prose flex items-center justify-center text-xl normal-case'>
        {' '}
        Your Alerts For the Upcoming Semester:
        <br />
        <br />
      </div>
      {!an && (
        <p className='prose flex items-center justify-center text-xl normal-case'>
          {' '}
          Looks like you have no alerts setup!
        </p>
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
      {changed && window.location.reload(false)}
    </div>
  )
}

export default page
