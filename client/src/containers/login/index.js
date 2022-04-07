import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { auth, signInWithEmailAndPassword } from '../../utils/firebase/firebase.config'
import Login from '../../components/common/form'
import AlertMessage from '../../components/common/alert_message'

const defaultState = {
  email: '', password: ''
}

const defaultStatus = {
  severity: 'info', title: '-', message: ''
}

function LoginContainer (props) {
  const [state, setState] = useState(defaultState)
  const [loadState, setLoadState] = useState(defaultStatus)

  useEffect(() => {
    if (props.authError !== '') {
      setLoadState(prev =>
        ({ ...prev, severity: 'error', title: 'Error', message: props.authError }))
    }
  }, [props.authError])

  const onInputChange = (e) => {
    const { id, value } = e.target
    setState(prev => ({ ...prev, [id]: value }))

    if (loadState.message !== '') {
      setLoadState(defaultStatus)
    }
  }

  const signIn = async () => {
    try {
      const { email, password } = state
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setLoadState(prev =>
        ({ ...prev, severity: 'error', title: 'Error', message: err.message }))
    }
  }

  return (
    <div>
      <Login
        hasUser={props.currentUser !== null}
        authError={props.authError}
        onInputChange={onInputChange}
        onBtnClick={signIn}
      />

      {loadState.message !== '' && <AlertMessage {...loadState} />}
    </div>
  )
}

LoginContainer.propTypes = {
  currentUser: PropTypes.object,
  authError: PropTypes.string
}

export default LoginContainer
