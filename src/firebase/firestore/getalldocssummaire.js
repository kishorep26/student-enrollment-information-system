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
export default async function getalldocssummaire() {
  let result = null
  let error = null
  let send = []
  // let docRef = doc(db, process.env.NEXT_PUBLIC_collection, id)
  // db.settings({ timestampsInSnapshots: true })
  let colref = collection(db, process.env.NEXT_PUBLIC_collection_summaire)
  try {
    result = await getDocs(query(colref))

    result.forEach((d) => {
      send.push(d.id)
    })
  } catch (e) {
    error = e
  }
  return { send, error }
}
