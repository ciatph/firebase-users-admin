import axios from 'axios'

export default class Service {
  constructor () {
    this.BASE_URL = process.env.REACT_APP_BASE_URL
    this.USERS_LIST = `${this.BASE_URL}/users`
  }

  getUsers = async () => await axios.get(this.USERS_LIST)
}
