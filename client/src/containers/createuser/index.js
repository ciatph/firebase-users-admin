import { useState } from 'react'
import { createUser } from '../../utils/service'
import UserForm from '../../components/common/userform'

const defaultState = {
  email: '', displayname: '', password: '', account_level: '1', disabled: false, emailverified: false
}

const defaultLoadingState = {
  isLoading: false, error: '', message: ''
}

function CreateUserContainer () {
  const [state, setState] = useState(defaultState)
  const [loading, setLoading] = useState(defaultLoadingState)

  const onInputChange = (e) => {
    let { id, value, checked } = e.target
    const key = (id !== undefined) ? id : 'account_level'

    if (['emailverified', 'disabled'].includes(key)) {
      value = checked
    }

    setState({ ...state, [key]: value })
    if (loading.error !== '' || loading.message !== '') {
      setLoading(defaultLoadingState)
    }
  }

  const createNewUser = async () => {
    try {
      setLoading({ ...loading, isLoading: true })
      await createUser(state)
      setLoading(prev => ({ ...defaultLoadingState, message: 'User created!' }))
    } catch (err) {
      setLoading(prev => ({ ...defaultLoadingState, error: err.response ? err.response.data : err.message }))
    }
  }

  return (
    <div>
      <h1>Create User</h1>

      <UserForm
        state={state}
        loadstatus={loading}
        onTextChange={onInputChange}
        onBtnClick={createNewUser}
      />
    </div>
  )
}

export default CreateUserContainer
