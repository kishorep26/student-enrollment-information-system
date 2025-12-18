import firebase_app from '../config'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

const db = getFirestore(firebase_app)

//for alerts
export default async function addDataalerts(data, id = 'IFT510') {
  let result = null
  let error = null
  let k = new Object()
  k[data] = null
  // db.settings({ timestampsInSnapshots: true })
  // console.log(k, typeof k, 'JK ROWLINGGG')
  try {
    result = await updateDoc(
      doc(db, process.env.NEXT_PUBLIC_collection_alerts, id),
      k
    )
  } catch (e) {
    error = e
  }

  return { result, error }
}
