/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const { onSchedule } = require('firebase-functions/v2/scheduler')
const { logger } = require('firebase-functions')
// const PromisePool = require('es6-promise-pool').default
// Maximum concurrent account deletions.
// const MAX_CONCURRENT = 3
admin.initializeApp()
exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, { admin: true })
    })
    .then(() => {
      return { message: `Success admin ${data.email}` }
    })
    .catch((err) => {
      return err
    })
})
///sumary counter on schedule
exports.summarize = onSchedule('every day 03:50', async (event) => {
  const seisref = admin.firestore().collection('seis')
  const snapshot = await seisref.get()
  snapshot.forEach((doc) => {
    // console.log(doc.id, doc.data().count())
    if (doc.id !== 'courses') {
      const doce = admin.firestore().doc(`/summaire/${doc.id}`)
      const k = new Object()
      k[new Date().toISOString().substring(0, 10)] = Object.keys(
        doc.data()
      ).length
      doce.update(k)
    }
  })
})
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
