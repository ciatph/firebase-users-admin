require('dotenv').config()
const { initializeApp } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')
const { credential } = require('firebase-admin')

if (process.env.FIREBASE_SERVICE_ACC === undefined || process.env.FIREBASE_PRIVATE_KEY === undefined) {
  console.log('FIREBASE_SERVICE_ACC or FIREBASE_PRIVATE_KEY is missing.')
  process.exit(1)
} else {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACC)

  // Escape the "private_key" read by dotenv
  serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')

  initializeApp({
    credential: credential.cert(serviceAccount)
  })
}

module.exports = {
  getAuth
}
