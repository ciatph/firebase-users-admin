import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import Navigation from './components/common/navigation'
import WithAuth from './containers/login/withauth'
import PrivateRoute from './containers/routes/privateroute'
import PublicRoute from './containers/routes/publicroute'
import { useAuth } from '../src/utils/firebase/auth'
import routes from './routes'

function App (props) {
  const auth = useAuth()

  return (
    <Container maxWidth='sm'>
      <Router>
        <Navigation currentUser={auth.currentUser} />

        <Routes>
          {routes.filter(route => route.component)
            .map(({ path, isProtected, component: Component }, idx) => {
              const FinalRoute = (isProtected)
                ? <PrivateRoute idx={idx} Component={Component} {...props} />
                : <PublicRoute idx={idx} Component={Component} path={path} {...props} />
              return <Route key={idx} path={path} element={FinalRoute} />
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
