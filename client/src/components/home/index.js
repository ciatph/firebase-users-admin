import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import AlertMessage from '../../components/common/alert_message'
import styles from './styles'

function Home (props) {
  return (
    <div>
      <h1>Home</h1>

      {props.currentUser &&
      <AlertMessage
        severity='info'
        title='Your Firebase Authorization Token'
      />}

      {props.currentUser &&
      <Card sx={{ marginTop: '16px' }}>
        <CardContent sx={styles.token}>
          {props.currentUser.accessToken}
        </CardContent>
      </Card>}
    </div>
  )
}

Home.propTypes = {
  currentUser: PropTypes.object
}

export default Home
