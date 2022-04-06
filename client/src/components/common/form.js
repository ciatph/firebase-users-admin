import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

function Form () {
  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
    >
      <TextField
        id='textfield'
        label='input'
        variant='outlined'
      />
    </Box>
  )
}

export default Form
