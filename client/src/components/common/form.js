import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from './styles'

function Form (props) {
  const { onInputChange, onBtnClick } = props

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      sx={styles.container}
    >
      <TextField
        id='email'
        label='Enter email'
        variant='outlined'
        onChange={onInputChange}
      />

      <TextField
        id='password'
        label='Enter password'
        variant='outlined'
        onChange={onInputChange}
      />

      <Button
        variant='contained'
        size='large'
        onClick={onBtnClick}
      >Log in
      </Button>
    </Box>
  )
}

Form.propTypes = {
  onInputChange: PropTypes.func,
  onBtnClick: PropTypes.func
}

export default Form
