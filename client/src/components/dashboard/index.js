import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import AlertMessage from '../../components/common/alert_message'
import styles from './styles'

function Dashboard ({ currentUser, error, users }) {
  return (
    <div>
      <h1>Dashboard</h1>

      {currentUser &&
        <AlertMessage
          severity='success'
          title='Success!'
          message={`Welcome home, ${currentUser.email}!`}
        />}

      {error !== '' &&
        <AlertMessage
          severity='error'
          title='Error'
          message={error}
        />}

      <h2>Firebase Auth Users</h2>

      {(users.length === 0) &&
        <Stack spacing={1}>
          {['', '', ''].map((item, index) => (
            <Skeleton key={index} variant='rectangular' width='100%' height={200} />
          ))}
        </Stack>
      }

      {users.map((item, index) => {
        const fields = ['uid', 'email', 'displayName', 'emailVerified', 'disabled']

        return <Card key={index} sx={styles.card}>
          <CardContent sx={styles.cardcontent}>
            {fields.map((itm, idx) => (
              <div key={idx}>
                <span><strong>{itm}: </strong></span>
                <span>{(item[itm] !== undefined ? item[itm].toString() : '-')}</span>
              </div>
            ))}

            <span><strong>account_level: </strong></span>
            <span>
              {item.customClaims
                ? item.customClaims.account_level
                : 'n/a'
              }
            </span>
          </CardContent>
        </Card>
      })}
    </div>
  )
}

Dashboard.propTypes = {
  currentUser: PropTypes.object,
  error: PropTypes.string,
  users: PropTypes.array
}

export default Dashboard
