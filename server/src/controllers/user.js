const {
  createuser,
  updateuser,
  deleteuser,
  getuser,
  listusers
} = require('../classes/user')

module.exports.createUser = async (req, res, next) => {
  const { email, displayname, password, account_level, emailverified, disabled } = req.body
  if (!email || !displayname || !account_level || !password) {
    return res.status(500).send('Missing parameter/s.')
  }

  try {
    const user = await createuser({
      email, displayname, password, account_level, emailverified, disabled
    })

    return res.status(200).json(user)
  } catch (err) {
    next(new Error(err))
  }
}

// Update a user's information by email or UID
module.exports.updateUser = async (req, res, next) => {
  const { uid } = req.body

  if (!uid) {
    return res.status(500).send('Missing UID.')
  }

  try {
    const user = await updateuser(req.body)
    return res.status(200).json(user)
  } catch (err) {
    next(new Error(err))
  }
}

// Delete a user by UID
module.exports.deleteUser = async (req, res, next) => {
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
    next(new Error(err))
  }
}

// Get user information by user's email or UID
module.exports.getUser = async (req, res, next) => {
  const { uid, email } = req.query

  if (!uid && !email) {
    return res.status(500).send('Missing parameter/s.')
  }

  try {
    const user = await getuser({ uid, email })
    return res.status(200).json(user)
  } catch (err) {
    next(new Error(err))
  }
}

// List all users
module.exports.listUsers = async (req, res, next) => {
  try {
    const users = await listusers()
    return res.status(200).json(users)
  } catch (err) {
    next(new Error(err))
  }
}
