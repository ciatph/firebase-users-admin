const { getAuth } = require('../../utils/db')

/**
 * Wrapper for managing Firebase Authentication users using the firebase-admin SDK.
 * Intended for superadmin level accounts usage.
 */
class User {
  // Create a new User with custom claims
  async createuser (params) {
    const { email, displayname, account_level } = params
    let user

    try {
      user = await getAuth()
        .createUser({
          email,
          emailVerified: false,
          password: '123456789',
          displayName: displayname,
          disabled: false
        })
    } catch (err) {
      throw new Error(err.message)
    }

    if (user) {
      try {
        await getAuth().setCustomUserClaims(user.uid, { account_level })
      } catch (err) {
        throw new Error(err.message)
      }
    }

    return user
  }

  // Update a user's information by email or UID
  async updateuser (params) {
    const fields = ['email', 'displayName', 'disabled', 'emailVerified']
    const { uid, account_level } = params
    const info = {}
    let user

    fields.forEach((item) => {
      const key = item.toLowerCase()
      if (params[key]) {
        info[item] = params[key]
      }
    })

    if (Object.keys(info).length > 0) {
      try {
        user = await getAuth().updateUser(uid, info)
      } catch (err) {
        throw new Error(err.message)
      }
    } else {
      throw new Error('Nothing to update.')
    }

    // Update custom claims
    if (account_level) {
      try {
        await getAuth().setCustomUserClaims(uid, { account_level })
      } catch (err) {
        throw new Error(err.message)
      }
    }

    return user
  }

  // Delete a user by UID
  async deleteuser (uid) {
    if (!uid) {
      throw new Error('Missing UID.')
    }

    try {
      return await getAuth().deleteUser(uid)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  // Get user information by user's email or UID
  async getuser (params) {
    const { uid, email } = params

    if (email) {
      try {
        return await getAuth().getUserByEmail(email)
      } catch (err) {
        throw new Error(err.message)
      }
    }

    if (uid) {
      try {
        return await getAuth().getUser(uid)
      } catch (err) {
        throw new Error(err.message)
      }
    }
  }

  // List all users
  async listusers () {
    try {
      return await getAuth().listUsers()
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

module.exports = User
