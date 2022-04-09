import { createContext, useContext, useState, useEffect } from 'react'
import { auth, signOut, signInWithEmailAndPassword } from './firebase.config'
import PropTypes from 'prop-types'

const authContext = createContext()

export function AuthProvider ({ children }) {
  const authuser = useFirebaseAuth()
  return <authContext.Provider value={authuser}>{children}</authContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.element
}

export const useAuth = () => {
  return useContext(authContext)
}

function useFirebaseAuth () {
  const [currentUser, setUser] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const handleUser = async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const user = await formatUser(firebaseUser)
        const { claims } = await firebaseUser.getIdTokenResult()

        if (claims.account_level) {
          setUser({ ...user, accountLevel: claims.account_level })
          setLoading(false)
        } else {
          // console.error('u y hav no claims!')
          await signOut(auth)
          setError('Invalid user. Missing custom claims.')
          setLoading(false)
        }
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    } else {
      setUser(null)
      setLoading(false)
    }
  }

  const signIn = async ({ email, password }) => {
    setLoading(true)
    setError('')

    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      handleUser(response.user)
    } catch (err) {
      setError(err.message)
      throw new Error(err.message)
    }
  }

  const logOut = async () => {
    try {
      setError('')
      await signOut(auth)
      handleUser(false)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUser)
    return () => unsubscribe()
  }, [])

  return {
    currentUser,
    loading,
    error,
    signIn,
    logOut
  }
}

const formatUser = async (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.name
  }
}
