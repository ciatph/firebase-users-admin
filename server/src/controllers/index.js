const { Router } = require('express')
const router = new Router()

const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  listUsers
} = require('./user')

const validFirebaseToken = require('../middleware/valid-token')

// ----------------------------------------
// USERS
// ----------------------------------------

/**
 * @api {post} /user Create Firebase User
 * @apiName createUser
 * @apiGroup User
 * @apiDescription Create a new Firebase Authentication user with given email
 *
 * @apiSampleRequest off
 * @apiParam (Request Body) {String} email User email
 * @apiParam (Request Body) {String} displayname Display name/username
 * @apiParam (Request Body) {Number} account_level account level for custom claims: 1=superadmin, 2=admin
 *
 * @apiSuccess {String} uid Unique Firebase user id
 * @apiSuccess {String} email User email
 * @apiSuccess {String} emailVerified true|false account's email verification status
 * @apiSuccess {String} displayName user's display name/username
 * @apiSuccess {String} disabled true|false account is enabled or disabled
 * @apiSuccess {Object} metadata
 * @apiSuccess {String} metadata.lastSignInTime Date/time the user has last signed-in
 * @apiSuccess {String} metadata.creationTime Date/time the UserRecord was created
 * @apiSuccess {Object} customClaims Custom created user parameters
 * @apiSuccess {Object} customClaims.account_level account type: 1=superadmin, 2=admin
 * @apiSuccess {String} tokensValidAfterTime time remaining for the user's login token validity
 * @apiSuccess {Object[]} providerData Object array of public fields returned by Firebase Authentication's Email/Password Provider
 * @apiSuccess {String} providerData.uid Unique Firebase user id
 * @apiSuccess {String} providerData.displayName user's display name/username
 * @apiSuccess {String} providerData.email User email
 * @apiSuccess {String} providerData.providerId Firebase Authentication Provider type
 *
 * @apiExample {js} Example usage:
 * const result = await axios.post('http://localhost:3001/api/user', {
 *    email: 'someonesemail@gmail.com',
 *    displayname: 'Some User',
 *    account_level: 2
 *  })
 */
router.post('/user', validFirebaseToken, createUser)

/**
 * @api {patch} /user Update UserRecord
 * @apiName updateUser
 * @apiGroup User
 * @apiDescription Update a Firebase Auth User's UserRecord by UID
 *
 * @apiSampleRequest off
 * @apiParam (Request Body) {String} uid Unique Firebase user id
 * @apiParam (Request Body) {String} [email] User email
 * @apiParam (Request Body) {String} [displayname] Display name/username
 * @apiParam (Request Body) {Bool} [disabled] true|false account is enabled or disabled
 * @apiParam (Request Body) {Bool} [emailverified] true|false account's email verification status
 * @apiParam (Request Body) {Number} [account_level] account level for custom claims: 1=superadmin, 2=admin
 *
 * @apiSuccess {Object} UserRecord Firebase UserRecord (see the 200 success result of the `Create Firebase User` endpoint for more information)
 *
 * @apiExample {js} Example usage:
 * const result = await axios.patch('http://localhost:3001/api/user', {
 *    uid: '85EmjTGiT1cYakDC6VGZ8uaGgZN2',
 *    displayname: 'Juan de la Cruz',
 *    account_level: 2
 *  })
 */
router.patch('/user', validFirebaseToken, updateUser)

/**
 * @api {delete} /user/:uid Delete UserRecord
 * @apiName deleteUser
 * @apiGroup User
 * @apiDescription Delete a Firebase Auth User's UserRecord by UID
 *
 * @apiSampleRequest off
 * @apiParam {String} uid Unique Firebase user id
 *
 * @apiSuccess {String} message Log message of successful user deletion.
 *
 * @apiExample {js} Example usage:
 * await axios.delete('http://localhost:3001/api/user/6uHhmVfPdjb6MR4ad5v9Np38z733')
 */
router.delete('/user/:uid', validFirebaseToken, deleteUser)

/**
 * @api {get} /user Get UserRecord
 * @apiName getUser
 * @apiGroup User
 * @apiDescription Get user's Firebase Auth UserRecord by user UID or email. Either one of `uid` or `email` should be provided on the GET request.
 *
 * @apiSampleRequest off
 * @apiParam (Request Query) {String} [uid] Unique Firebase user id
 * @apiParam (Request Query) {String} [email] User id
 *
 * @apiSuccess {Object} UserRecord Firebase UserRecord (see the 200 success result of the `Create Firebase User` endpoint for more information)
 *
 * @apiExample {js} Example usage:
 * await axios.get('http://localhost:3001/api/user?uid=85EmjTGiT1cYakDC6VGZ8uaGgZN2')
 * await axios.get('http://localhost:3001/api/user?email=someonesemail@gmail.com')
 */
router.get('/user', getUser)

/**
 * @api {get} /users List UserRecords
 * @apiName getUserList
 * @apiGroup User
 * @apiDescription Get the UserRecord of all Firebase Auth Users
 *
 * @apiSampleRequest off
 *
 * @apiSuccess {Object[]} users[] Array of Firebase UserRecords (see the 200 success result of the `Create Firebase User` endpoint for more information)
 *
 * @apiExample {js} Example usage:
 * await axios.get('http://localhost:3001/api/users')
 */
router.get('/users', listUsers)

module.exports = router
