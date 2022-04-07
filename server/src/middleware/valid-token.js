const { getAuth } = require('../utils/db')

// Check if a signed-in user's firebase ID token is valid
// Inserts valid user data to the request object 'req.user'
const validFirebaseToken = async (req, res) => {
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    console.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>'
    )
    res.status(403).send('Unauthorized')
    return
  }

  let idToken
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    // No cookie
    res.status(403).send('Unauthorized')
    return
  }

  try {
    const decodedIdToken = await getAuth().verifyIdToken(idToken)
    console.log('ID Token correctly decoded', JSON.stringify(decodedIdToken))

    if (!decodedIdToken.email_verified) {
      res.status(403).send('Unauthorized. Please confirm your email.')
      return
    }

    req.user = decodedIdToken
    next()
    return
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error)
    res.status(403).send('Unauthorized')
  }
}

module.exports = validFirebaseToken
