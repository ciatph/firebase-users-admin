const ACCOUNT_LEVEL = {
  SUPERADMIN: 1,
  ADMIN: 2
}

const EMAIL_WHITELIST = process.env.EMAIL_WHITELIST.split(',')

module.exports = {
  ACCOUNT_LEVEL,
  EMAIL_WHITELIST
}
