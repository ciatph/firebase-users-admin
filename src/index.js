const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})
