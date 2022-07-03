import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { updateUser } from '../../utils/service'
import UserForm from '../../components/common/userform'

const defaultState = {
  email: '', displayname: '', password: '', account_level: '1', disabled: false, emailverified: false
}

const defaultLoadingState = {
  isLoading: false, error: '', message: ''
}

function UpdateUserContainer () {
  const location = useLocation()
  const [state, setState] = useState(location.state ? { ...location.state, password: '' } : defaultState)
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

  const onBtnUpdateClick = async () => {
    try {
      setLoading({ ...loading, isLoading: true })
      await updateUser(state)
      setLoading(prev => ({ ...defaultLoadingState, message: 'User info updated.' }))
    } catch (err) {
      setLoading(prev => ({ ...defaultLoadingState, error: err.response ? err.response.data : err.message }))
    }
  }

  return (
    <div>
      <h1>Update User</h1>

      <UserForm
        state={state}
        loadstatus={loading}
        onTextChange={onInputChange}
        onBtnClick={onBtnUpdateClick}
        type='update'
      />
    </div>
  )
}

export default UpdateUserContainer
