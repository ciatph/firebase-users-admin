import { useState } from 'react'
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
      const result = await signInWithEmailAndPassword(auth, email, password)
      setLoadState(prev =>
        ({ ...prev, severity: 'success', title: 'Success', message: `Welcome aboard, ${result.user.email}!` }))
    } catch (err) {
      setLoadState(prev =>
        ({ ...prev, severity: 'error', title: 'Error', message: err.message }))
    }
  }

  return (
    <div>
      <Login
        hasUser={props.currentUser !== null}
        onInputChange={onInputChange}
        onBtnClick={signIn}
      />

      {loadState.message !== '' && <AlertMessage {...loadState} />}
    </div>
  )
}

LoginContainer.propTypes = {
  currentUser: PropTypes.object
}

export default LoginContainer
