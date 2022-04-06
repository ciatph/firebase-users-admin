import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import routes from './routes'
import Navigation from './components/common/navigation'
import WithAuth from './containers/login/withauth'

function App (props) {
  return (
    <Container maxWidth='sm'>
      <Router>
        <Navigation currentUser={props.currentUser} />
        <Routes>
          {routes.filter(route => route.component)
            .map(({ path, component: Component }, idx) => (
              <Route
                key={idx}
                path={path}
                element={<Component {...props} />}
              />
            ))}
        </Routes>
      </Router>
    </Container>
  )
}

App.propTypes = {
  currentUser: PropTypes.object
}

export default WithAuth(App)
