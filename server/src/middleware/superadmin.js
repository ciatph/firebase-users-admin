const { ACCOUNT_LEVEL } = require('../utils/constants')

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
