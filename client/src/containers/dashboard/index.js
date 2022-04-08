import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Dashboard from '../../components/dashboard'
import { getUsers, deleteUser } from '../../utils/service'

const defaultLoadingState = {
  isLoading: false, error: '', message: ''
}

function DashboardContainer (props) {
  const [state, setState] = useState([])
  const [loading, setLoading] = useState(defaultLoadingState)
  const navigate = useNavigate()

  useEffect(() => {
    let loaded = true

    const loadUsers = async () => {
      try {
        const result = await getUsers()
        if (loaded) {
          setState(prev => result.data.users)
        }
      } catch (err) {
        setLoading(prev => ({ ...prev, isLoading: false, error: err.response ? err.response.data : err.message }))
      }
    }

    loadUsers()

    return () => (loaded = false)
  }, [])

  const onDeleteUser = async (uid) => {
    try {
      setLoading({ ...defaultLoadingState, isLoading: true })
      await deleteUser(uid)
      const result = await getUsers()
      setState(prev => result.data.users)
      setLoading(prev => ({ ...defaultLoadingState, message: 'User deleted!' }))
    } catch (err) {
      setLoading(prev => ({ ...defaultLoadingState, error: err.response ? err.response.data : err.message }))
    }
  }

  const onEditUser = (info) => {
    navigate('/edit', {
      replace: true,
      state: {
        uid: info.uid,
        email: info.email,
        displayname: info.displayName,
        disabled: info.disabled,
        emailverified: info.emailVerified,
        account_level: (info.customClaims) ? info.customClaims.account_level : -1
      }
    })
  }

  return (
    <Dashboard
      currentUser={props.currentUser}
      users={state}
      loadstatus={loading}
      onBtnClick={onDeleteUser}
      onBtnEditClick={onEditUser}
    />
  )
}

DashboardContainer.propTypes = {
  currentUser: PropTypes.object
}

export default DashboardContainer
