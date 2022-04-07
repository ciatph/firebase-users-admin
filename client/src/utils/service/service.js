import axios from 'axios'
import { auth } from '../firebase/firebase.config'

export default class Service {
  constructor () {
    this.BASE_URL = process.env.REACT_APP_BASE_URL
    this.USERS_API = `${this.BASE_URL}/user`
    this.USERS_API_LIST = `${this.BASE_URL}/users`
  }

  // Fetch the Firebase auth token
  // Attach the token in the Authorization header of a request object along with the body/query parameters
  // Call this method after the Firebase Auth user data has settled in
  async setAuthHeaders (obj) {
    let token

    try {
      token = await auth.currentUser.getIdToken(true)
    } catch (err) {
      throw new Error(err.message)
    }

    if (token) {
      obj.headers.Authorization = `Bearer ${token}`
    } else {
      obj.headers.Authorization = ''
    }
  }

  /**
   * Attach a Firebase ID token in the Authorization header of a request object
   * @param {Object} param.body - Request parameters in the request body
   * @param {Object} param.params - Request "query" parameters
   */
  async createRequestObject ({ body, params }) {
    const obj = {
      headers: {}
    }

    if (body) {
      obj.data = body
    }

    if (params) {
      obj.params = params
    }

    await this.setAuthHeaders(obj)
    return obj
  }

  async createUser (user) {
    const fields = ['email', 'displayname', 'account_level']
    const body = {}

    fields.forEach((item) => {
      if (user[item]) {
        body[item] = user[item]
      }
    })

    const obj = await this.createRequestObject({ body })
    const res = await axios({ ...obj, url: this.USERS_API, method: 'POST' })
    return res.data
  }

  async updateUser (info) {
    const fields = ['uid', 'displayname', 'disabled', 'emailverified', 'account_level']
    const body = {}

    fields.forEach((item) => {
      if (info[item.toLowerCase()]) {
        body[item] = info[item.toLowerCase()]
      }
    })

    const obj = await this.createRequestObject({ body })
    const res = await axios({ ...obj, url: this.USERS_API, method: 'PATCH' })
    return res.data
  }

  async deleteUser (uid) {
    const obj = await this.createRequestObject({})
    const res = await axios.delete(`${this.USERS_API}/${uid}`, obj)
    return res.data
  }

  async getUser ({ uid, email }) {
    let params = {}

    if (uid) {
      params = { uid }
    }

    if (email) {
      params = { email }
    }

    const obj = await this.createRequestObject({ params })
    const res = await axios.get(`${this.BASE_URL}/user`, obj)
    return res.data
  }

  getUsers = async () => await axios.get(this.USERS_API_LIST)
}
