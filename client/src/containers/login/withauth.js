import { useState, useEffect } from 'react'
import { auth, signOut } from '../../utils/firebase/firebase.config'

const WithAuth = (Component) => {
  function AuthAwareComponent (props) {
    const [currentUser, setUser] = useState(null)

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
              setUserValue(user, mounted)
            } else {
              // console.error('u y hav no claims!')
              await signOut(auth)
              // console.error('begone!')
              throw new Error('Invalid user.')
            }
          } catch (err) {
            // console.error(err.message)
            throw new Error(err.message)
          }
        } else {
          setUserValue(null, mounted)
        }
      })
      return () => (mounted = false)
    }, [])

    return <Component {...props} currentUser={currentUser} />
  }

  return AuthAwareComponent
}

export default WithAuth
