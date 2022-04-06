const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001

const controllers = require('./controllers')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/api', controllers)

app.get('/hello', (req, res) => {
  res.status(200).send('OK!')
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
