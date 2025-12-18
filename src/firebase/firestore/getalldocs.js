import firebase_app from '../config'
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  query,
} from 'firebase/firestore'
const db = getFirestore(firebase_app)
//for courses and enrollment data
export default async function getalldocs(uid) {
  let result = null
  let error = null
  let send = []
  let i = 0
  // let docRef = doc(db, process.env.NEXT_PUBLIC_collection, id)
  // db.settings({ timestampsInSnapshots: true })
  let colref = collection(db, process.env.NEXT_PUBLIC_collection)
  try {
    result = await getDocs(query(colref))

    result.forEach((d) => {
      if (d.id !== 'courses') {
        if (Object.keys(d.data()).includes(uid) === false) {
          // console.log(d.id, 'vaaaamooo')
          // console.log('this doc', d.id, 'doesnt contain', uid)
          send.push(d.id)
        } else {
          i = i + 1
          // console.log(i, 'ayyye')
        }
      }
    })
  } catch (e) {
    error = e
  }
  // console.log(i, 'finale ayye')
  send.push(i)
  return { send, error }
}
