import { useState } from 'react'
import { createUser } from '../../utils/service'
import Home from '../../components/createuser'

const defaultState = {
  email: '', displayname: '', account_level: '1'
}

const defaultLoadingState = {
  isLoading: false, error: '', message: ''
}

function CreateUserContainer () {
  const [state, setState] = useState(defaultState)
  const [loading, setLoading] = useState(defaultLoadingState)

  const onInputChange = (e) => {
    const { id, value } = e.target
    const key = (id !== undefined) ? id : 'accountlevel'
    setState({ ...state, [key]: value })

    if (loading.error !== '' || loading.message !== '') {
      setLoading(defaultLoadingState)
    }
  }

  const createNewUser = async () => {
    try {
      setLoading({ ...loading, isLoading: true })
      await createUser(state)
      setLoading({ ...loading, isLoading: false, message: 'User created!' })
    } catch (err) {
      setLoading({ ...loading, isLoading: false, error: err.response ? err.response.data : err.message })
    }
  }

  return (
    <Home
      state={state}
      loadstatus={loading}
      onTextChange={onInputChange}
      onBtnClick={createNewUser}
    />
  )
}

export default CreateUserContainer
