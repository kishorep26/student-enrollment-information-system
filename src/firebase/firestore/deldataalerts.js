import firebase_app from '../config'
import { getFirestore, doc, updateDoc, deleteField } from 'firebase/firestore'

const db = getFirestore(firebase_app)

// for alerts data
export default async function delDataalerts(data, id = 'IFT510') {
  let result = null
  let error = null
  let k = new Object()
  k[data] = deleteField()
  // db.settings({ timestampsInSnapshots: true })
  // console.log(k, typeof k, 'JK ROWLINGGG', 'deleteionnn')
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
