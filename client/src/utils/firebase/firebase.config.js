// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB1SivNCSCPXFV4v4FhE-Ll2av8nHEWr-8',
  authDomain: 'users-admin-firebase.firebaseapp.com',
  projectId: 'users-admin-firebase',
  storageBucket: 'users-admin-firebase.appspot.com',
  messagingSenderId: '761515421472',
  appId: '1:761515421472:web:d7c737ba274515297f3145',
  measurementId: 'G-ZCWY6YX0P0'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()

export {
  auth,
  signOut,
  signInWithEmailAndPassword
}
