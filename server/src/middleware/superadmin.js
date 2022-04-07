const { ACCOUNT_LEVEL } = require('../utils/constants')

const isSuperAdmin = async (req, res, next) => {
  if (req.user.account_level === ACCOUNT_LEVEL.SUPERADMIN) {
    next()
  } else {
    res.status(403).send('Unauthorized. Not a superadmin.')
  }
}

module.exports = isSuperAdmin
