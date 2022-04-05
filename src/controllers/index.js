const { Router } = require('express')
const router = new Router()

const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  listUsers
} = require('./user')

// ----------------------------------------
// USERS
// ----------------------------------------

// Create a new user with given email
router.post('/user', createUser)

// Update a user's information by UID
router.patch('/user', updateUser)

// Delete a user by UID
router.delete('/user/:uid', deleteUser)

// Get user information by user's UID
router.get('/user', getUser)

// List all users
router.get('/users', listUsers)

module.exports = router
