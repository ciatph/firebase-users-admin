import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Container from '@mui/material/Container'
import routes from './routes'
import Navigation from './components/common/navigation'

function App (props) {
  return (
    <Container maxWidth='sm'>
      <Router>
        <Navigation />
        <Routes>
          {routes.filter(route => route.component)
            .map(({ path, component: Component }, idx) => (
              <Route
                key={idx}
                path={path}
                element={<Component />}
              />
            ))}
        </Routes>
      </Router>
    </Container>
  )
}

export default App
