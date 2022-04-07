import Service from './service'
const SERVICE = new Service()

export const createUser = SERVICE.createUser.bind(SERVICE)
export const updateUser = SERVICE.updateUser.bind(SERVICE)
export const deleteUser = SERVICE.deleteUser.bind(SERVICE)
export const getUser = SERVICE.getUser.bind(SERVICE)
export const getUsers = SERVICE.getUsers.bind(SERVICE)
