import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

// Redirect protected routes to /login if no user auth data is available
// Display the protected routes if user auth data is available
function PrivateRoute ({ Component, idx, ...props }) {
  if (!props.currentUser) {
    return <Navigate key={idx}
      to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  }
  return <Component {...props} />
}

PrivateRoute.propTypes = {
  Component: PropTypes.elementType,
  idx: PropTypes.number,
  currentUser: PropTypes.object,
  location: PropTypes.object
}

export default PrivateRoute
