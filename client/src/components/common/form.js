import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import styles from './styles'

function Form () {
  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      sx={styles.container}
    >
      <TextField
        id='username'
        label='Enter username'
        variant='outlined'
      />

      <TextField
        id='password'
        label='Enter password'
        variant='outlined'
      />

      <Button
        variant='contained'
        size='large'
      > Log in
      </Button>
    </Box>
  )
}

export default Form
