import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'

function Navigation () {
  return (
    <Container maxWidth='sm'>
      <Link to='/'>Home</Link> | <Link to='/dashboard'>Dashboard</Link> | <Link to='/login'>Login</Link>
    </Container>
  )
}

export default Navigation
