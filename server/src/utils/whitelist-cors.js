const whitelist = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000']

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS.'))
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'PATCH'],
  optionsSuccessStatus: 200
}

const corsOptionsDelegate = (req, callback) => {
  let corsoptions = {}
  let allowed = false

  const hOrigin = req.header('Origin')
  const origin = req.headers.origin
  const host = req.headers.host
  const w = req.headers['sec-fetch-site']

  console.log(`--header: "${hOrigin}"\n -req.origin: ${origin}\n -host: ${host}\n -fetchsite: ${fetchsite}\n`)

  if (fetchsite === 'same-origin') {
    allowed = true
  } else if (fetchsite === 'same-site') {
    allowed = whitelist.includes(hOrigin) && whitelist.includes(origin)
  } else if (fetchsite === undefined) {
    allowed = false
  }

  corsoptions.origin = allowed
  callback(null, corsoptions)
}

module.exports = {
  corsOptions,
  whitelist,
  corsOptionsDelegate
}
