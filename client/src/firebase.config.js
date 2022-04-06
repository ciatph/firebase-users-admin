// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAnUCIOKHs0cFc0ICa7YnC1r_u4yD6X8gI',
  authDomain: 'climate-webservices.firebaseapp.com',
  databaseURL: 'https://climate-webservices-default-rtdb.firebaseio.com',
  projectId: 'climate-webservices',
  storageBucket: 'climate-webservices.appspot.com',
  messagingSenderId: '1070666877655',
  appId: '1:1070666877655:web:208a0424af36e497e2be92',
  measurementId: 'G-SRY2RQLEBL'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
