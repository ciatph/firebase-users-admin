const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root, button': {
      marginTop: (theme) => theme.spacing(2)
    }
  },
  btnContainer: {
    display: 'flex',
    gap: 3,
    '& button': {
      flexGrow: 1
    }
  }
}

export default styles
