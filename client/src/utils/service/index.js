import Service from './service'
const SERVICE = new Service()

export const getUsers = SERVICE.getUsers.bind(SERVICE)
