import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import UserButton from './userbutton'

function Navigation (props) {
  return (
    <Container maxWidth='sm'>
      <Link to='/'>Home</Link> | <Link to='/dashboard'>Dashboard</Link> | <Link to='/create'>Create User</Link> | {UserButton(props.currentUser)}
    </Container>
  )
}

Navigation.propTypes = {
  currentUser: PropTypes.object
}

export default Navigation
