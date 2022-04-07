import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Dashboard from '../../components/dashboard'
import { getUsers, deleteUser } from '../../utils/service'

const defaultLoadingState = {
  isLoading: false, error: '', message: ''
}

function DashboardContainer (props) {
  const [state, setState] = useState([])
  const [loading, setLoading] = useState(defaultLoadingState)

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
      setLoading({ ...loading, isLoading: true })
      await deleteUser(uid)
      const result = await getUsers()
      setState(prev => result.data.users)
      setLoading({ ...loading, isLoading: false, message: 'User deleted!' })
    } catch (err) {
      setLoading({ ...loading, isLoading: false, error: err.response ? err.response.data : err.message })
    }
  }

  return (
    <Dashboard
      currentUser={props.currentUser}
      users={state}
      loadstatus={loading}
      onBtnClick={onDeleteUser}
    />
  )
}

DashboardContainer.propTypes = {
  currentUser: PropTypes.object
}

export default DashboardContainer
