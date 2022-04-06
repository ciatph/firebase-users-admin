import PropTypes from 'prop-types'
import Dashboard from '../../components/dashboard'

function DashboardContainer (props) {
  return (
    <Dashboard user={props.currentUser} />
  )
}

DashboardContainer.propTypes = {
  currentUser: PropTypes.object
}

export default DashboardContainer
