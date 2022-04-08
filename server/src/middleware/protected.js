const { EMAIL_WHITELIST } = require('../utils/constants')
const { getuser } = require('../classes/user')

// Reject the request if the uid's associated email is included in the whitelist
const isProtected = async (req, res, next) => {
  let uid = req.body.uid ?? ''
  uid = req.params.uid ?? uid

  try {
    // Check if account is protected
    const user = await getuser({ uid })

    if (EMAIL_WHITELIST.includes(user.email)) {
      return res.status(403).send('The resource you are trying to access is protected.')
    }
  } catch (err) {
    return res.status(500).send(err.message)
  }

  next()
}

module.exports = isProtected
