const { createuser } = require('../classes/user')

/**
 * Create an intial superadmin account.
 * email: superadmin@gmail.com'
 * password: 123456789
 */
const seed = async () => {
  const params = {
    email: 'superadmin@gmail.com',
    displayname: 'Super Admin',
    account_level: 1
  }

  try {
    console.log('Creating a superadmin user...')
    const user = await createuser(params)

    console.log('User created!')
    console.log(user)
  } catch (err) {
    console.log(err.message)
  }
}

(async () => {
  await seed()
})()
