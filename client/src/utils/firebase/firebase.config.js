// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBMgidvWJ00nJipz4MCl5U8FmfH6juJKpo',
  authDomain: 'weaponsforge-dev.firebaseapp.com',
  databaseURL: 'https://weaponsforge-dev.firebaseio.com',
  projectId: 'weaponsforge-dev',
  storageBucket: 'weaponsforge-dev.appspot.com',
  messagingSenderId: '90348836363',
  appId: '1:90348836363:web:ab5537dd4d6a81c6e6190e',
  measurementId: 'G-88GJJN6TD4'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()

export {
  auth,
  signOut,
  signInWithEmailAndPassword
}
