import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import AlertMessage from '../common/alert_message'
import styles from './styles'

function CreateUser ({ state, loadstatus, onTextChange, onBtnClick }) {
  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      sx={styles.container}
    >
      <h1>Create User</h1>

      <TextField
        id='email'
        label='Enter email'
        variant='outlined'
        size='small'
        disabled={loadstatus.isLoading}
        value={state.email}
        onChange={onTextChange}
      />

      <TextField
        id='displayname'
        label='Enter display name'
        variant='outlined'
        size='small'
        disabled={loadstatus.isLoading}
        value={state.displayname}
        onChange={onTextChange}
      />

      <InputLabel sx={styles.formlabel} id='accountlevel-label'>Account Type</InputLabel>
      <Select
        labelId='accountlevel-label'
        id='account_level'
        size='small'
        disabled={loadstatus.isLoading}
        value={state.account_level}
        onChange={onTextChange}
      >
        <MenuItem value={1} size='small'>Superadmin</MenuItem>
        <MenuItem value={2} size='small'>Admin</MenuItem>
      </Select>

      <Button
        variant='contained'
        sx={styles.button}
        onClick={onBtnClick}
      >Submit
      </Button>

      {(loadstatus.message !== '' || loadstatus.error !== '') &&
        <AlertMessage
          severity={(loadstatus.error !== '') ? 'error' : 'success'}
          title={(loadstatus.error !== '') ? 'Error' : 'Success'}
          message={(loadstatus.error !== '') ? loadstatus.error : loadstatus.message}
        />
      }
    </Box>
  )
}

CreateUser.propTypes = {
  state: PropTypes.object,
  loadstatus: PropTypes.object,
  onTextChange: PropTypes.func,
  onBtnClick: PropTypes.func
}

export default CreateUser
