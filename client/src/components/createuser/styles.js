const styles = {
  container: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root, button': {
      marginTop: (theme) => theme.spacing(2)
    }
  },
  formlabel: {
    fontSize: '12px',
    marginTop: (theme) => theme.spacing(1),
    marginBottom: '4px'
  },
  button: {
    marginBottom: (theme) => theme.spacing(2)
  }
}

export default styles
