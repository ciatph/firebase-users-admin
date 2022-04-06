import PropTypes from 'prop-types'
import AlertMessage from '../../components/common/alert_message'

function Dashboard ({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>

      {user &&
        <AlertMessage
          severity='success'
          title='Success!'
          message={`Welcome home, ${user.email}!`}
        />}
    </div>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object
}

export default Dashboard
