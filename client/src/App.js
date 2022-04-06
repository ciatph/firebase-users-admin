import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Navigation from './components/common/navigation'
import WithAuth from './containers/login/withauth'
import PrivateRoute from './containers/routes/privateroute'
import PublicRoute from './containers/routes/publicroute'
import routes from './routes'

function App (props) {
  return (
    <Container maxWidth='sm'>
      <Router>
        <Navigation currentUser={props.currentUser} />

        <Routes>
          {routes.filter(route => route.component)
            .map(({ path, isProtected, component: Component }, idx) => {
              const SettledRoute = () => {
                if (isProtected) {
                  return <PrivateRoute
                    Component={Component}
                    isProtected={isProtected}
                    idx={idx}
                    {...props}
                  />
                } else {
                  return <PublicRoute
                    Component={Component}
                    idx={idx}
                    path={path}
                    {...props}
                  />
                }
              }

              return <Route
                key={idx}
                path={path}
                element={SettledRoute()}
              />
            })}
        </Routes>
      </Router>
    </Container>
  )
}

App.propTypes = {
  currentUser: PropTypes.object,
  /* eslint-disable react/no-unused-prop-types */
  location: PropTypes.object
}

export default WithAuth(App)
