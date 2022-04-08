const {
  createuser,
  updateuser,
  deleteuser,
  getuser,
  listusers
} = require('../classes/user')

const { EMAIL_WHITELIST } = require('../utils/constants')

module.exports.createUser = async (req, res) => {
  const { email, displayname, account_level, emailverified, disabled } = req.body

  if (!email || !displayname || !account_level) {
    return res.status(500).send('Missing parameter/s.')
  }

  try {
    const user = await createuser({
      email, displayname, account_level, emailverified, disabled
    })

    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

// Update a user's information by email or UID
module.exports.updateUser = async (req, res) => {
  const { uid } = req.body

  if (!uid) {
    return res.status(500).send('Missing UID.')
  }

  try {
    const user = await updateuser(req.body)
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

// Delete a user by UID
module.exports.deleteUser = async (req, res) => {
  const { uid } = req.params

  if (!uid) {
    return res.status(500).send('Missing UID.')
  }

  try {
    await deleteuser(uid)
    return res.status(200).send({
      message: `User ${uid} deleted.`
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

// Get user information by user's email or UID
module.exports.getUser = async (req, res) => {
  const { uid, email } = req.query

  if (!uid && !email) {
    return res.status(500).send('Missing parameter/s.')
  }

  try {
    const user = await getuser({ uid, email })
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

// List all users
module.exports.listUsers = async (req, res) => {
  try {
    const users = await listusers()
    return res.status(200).json(users)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
