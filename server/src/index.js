const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

const controllers = require('./controllers')
const { corsOptions } = require('./utils/whitelist-cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, '..', 'public')))

if (process.env.ENABLE_CORS === '1') {
  app.use(cors(corsOptions))
}

app.use('/api', controllers)

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

app.use((err, req, res, next) => {
  return res.status(500).send(err.message)
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
