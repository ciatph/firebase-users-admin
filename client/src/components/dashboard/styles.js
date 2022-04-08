const styles = {
  card: {
    marginTop: (theme) => theme.spacing(2)
  },
  cardcontent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '& span': {
      fontSize: '14px'
    }
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: (theme) => theme.spacing(1),
    width: '100%'
  }
}

export default styles
