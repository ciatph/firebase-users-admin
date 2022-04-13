const styles = {
  card: {
    marginTop: (theme) => theme.spacing(2)
  },
  cardcontent: {
    width: '100%',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row'
    },
    justifyContent: 'space-between',
    '& span': {
      fontSize: '14px'
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: (theme) => theme.spacing(1),
    '& button': {
      width: '100%'
    }
  }
}

export default styles
