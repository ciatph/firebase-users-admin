const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

const controllers = require('./controllers')
const { whitelist } = require('./utils/whitelist-cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cors({
  origin: whitelist
}))

app.use('/api', controllers)

app.get('/', (req, res) => {
  res.status(200).send('OK!')
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
