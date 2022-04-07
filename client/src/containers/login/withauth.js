import { useState, useEffect } from 'react'
import { auth, signOut } from '../../utils/firebase/firebase.config'

const WithAuth = (Component) => {
  function AuthAwareComponent (props) {
    const [currentUser, setUser] = useState(null)
    const [error, setError] = useState('')

    const setUserValue = (user, mounted) => {
      if (mounted) {
        setUser(prev => user)
      }
    }

    useEffect(() => {
      let mounted = true

      // Firebase auth state changed listener
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const { claims } = await user.getIdTokenResult()

            if (claims.account_level) {
              setUserValue({ ...user, accountLevel: claims.account_level }, mounted)
            } else {
              // console.error('u y hav no claims!')
              await signOut(auth)
              setError('Invalid user. Missing custom claims.')
            }
          } catch (err) {
            setError(err.message)
          }
        } else {
          setUserValue(null, mounted)
          setError('')
        }
      })
      return () => (mounted = false)
    }, [])

    return <Component {...props} authError={error} currentUser={currentUser} />
  }

  return AuthAwareComponent
}

export default WithAuth
