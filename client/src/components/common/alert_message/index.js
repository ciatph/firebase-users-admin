import PropTypes from 'prop-types'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

function AlertMessage ({ severity = 'info', title = 'title', message = '' }) {
  return (
    <Alert severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  )
}

AlertMessage.propTypes = {
  severity: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string
}

export default AlertMessage
