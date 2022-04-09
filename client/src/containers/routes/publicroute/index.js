import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

// Redirect the non-protected /login route to /dashboard if user data is available
// Display regular public routes without redirect
function PublicRoute ({ Component, idx, path, ...props }) {
  if (props.currentUser) {
    if (['/login'].includes(path)) {
      return <Navigate key={idx}
        to={{
          pathname: '/dashboard',
          state: { from: props.location }
        }} />
    }
    return <Component {...props} />
  }
  return <Component {...props} />
}

PublicRoute.propTypes = {
  Component: PropTypes.elementType,
  idx: PropTypes.number,
  path: PropTypes.string,
  currentUser: PropTypes.object,
  location: PropTypes.object
}

export default PublicRoute
