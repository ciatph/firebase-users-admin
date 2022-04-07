import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import AlertMessage from '../../components/common/alert_message'
import styles from './styles'

function Dashboard ({ currentUser, users, loadstatus, onBtnClick }) {
  return (
    <div>
      <h1>Dashboard</h1>

      {currentUser &&
        <AlertMessage
          severity='success'
          title='Welcome!'
          message={`Welcome home, ${currentUser.email}!`}
        />}

      {(loadstatus.message !== '' || loadstatus.error !== '') &&
        <AlertMessage
          severity={(loadstatus.error !== '') ? 'error' : 'success'}
          title={(loadstatus.error !== '') ? 'Error' : 'Success'}
          message={(loadstatus.error !== '') ? loadstatus.error : loadstatus.message}
        />
      }

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
            <div>
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
            </div>
            <div>
              <Button
                variant='contained'
                size='small'
                disabled={loadstatus.isLoading}
                onClick={() => onBtnClick(item.uid)}
              >Delete</Button>
            </div>
          </CardContent>
        </Card>
      })}
    </div>
  )
}

Dashboard.propTypes = {
  currentUser: PropTypes.object,
  users: PropTypes.array,
  loadstatus: PropTypes.object,
  onBtnClick: PropTypes.func
}

export default Dashboard
