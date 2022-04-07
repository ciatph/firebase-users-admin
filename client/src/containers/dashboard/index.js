import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Dashboard from '../../components/dashboard'
import { getUsers } from '../../utils/service'

function DashboardContainer (props) {
  const [state, setState] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let loaded = true

    const loadUsers = async () => {
      try {
        const result = await getUsers()
        if (loaded) {
          setState(prev => result.data.users)
        }
      } catch (err) {
        setError(err.message)
      }
    }

    loadUsers()

    return () => (loaded = false)
  }, [])

  return (
    <Dashboard
      currentUser={props.currentUser}
      users={state}
      error={error}
    />
  )
}

DashboardContainer.propTypes = {
  currentUser: PropTypes.object
}

export default DashboardContainer
