import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import AlertMessage from '../alert_message'
import styles from './styles'

function UserForm (props) {
  const { state, loadstatus, onTextChange, onBtnClick, type = 'create' } = props

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      sx={styles.container}
    >

      {type !== 'create' &&
        <TextField
          id='uid'
          label='Enter UID'
          variant='outlined'
          size='small'
          disabled
          value={state.uid}
        />}

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

      <TextField
        id='password'
        label='Enter password'
        variant='outlined'
        size='small'
        disabled={loadstatus.isLoading}
        value={state.password}
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

      <FormControlLabel control={
        <Switch checked={state.disabled} id='disabled' name='disabled' onChange={onTextChange} />}
      label="Account Disabled" />
      <FormControlLabel control={
        <Switch checked={state.emailverified} id='emailverified' name='emailverified' onChange={onTextChange} />}
      label="Email Verified" />

      <Button
        variant='contained'
        sx={styles.button}
        disabled={loadstatus.isLoading}
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

UserForm.propTypes = {
  state: PropTypes.object,
  loadstatus: PropTypes.object,
  onTextChange: PropTypes.func,
  onBtnClick: PropTypes.func,
  type: PropTypes.string
}

export default UserForm
