const validFirebaseToken = require('./valid-token')
const isSuperAdmin = require('./superadmin')
const isProtected = require('./protected')

module.exports = {
  validFirebaseToken,
  isSuperAdmin,
  isProtected
}
