const { ACCOUNT_LEVEL } = require('../utils/constants')

// Checks if a signed-in user is a superadmin
// Requires the validFirebaseToken middleware
const isSuperAdmin = async (req, res, next) => {
  let level = 0

  if (req.user.account_level) {
    level = parseInt(req.user.account_level)
  }

  if (level === ACCOUNT_LEVEL.SUPERADMIN) {
    next()
  } else {
    res.status(403).send('Unauthorized. Not a superadmin.')
  }
}

module.exports = isSuperAdmin
