import { Link } from 'react-router-dom'
import { auth, signOut } from '../../../config/firebase.config'

function UserButton (hasUser) {
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      // console.log(err.message)
      throw new Error(err.message)
    }
  }

  return (hasUser
    ? <Link to='#' onClick={logout}>Logout</Link>
    : <Link to='/login'>Login</Link>)
}

export default UserButton
