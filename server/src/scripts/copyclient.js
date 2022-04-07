const fs = require('fs-extra')
const path = require('path')

// Copy the /client build (website) directory to the server's public root directory
const copyClientApp = async (src, dest) => {
  fs.move(src, dest, { overwrite: true })
    .then(() => console.log('success!'))
    .catch(err => console.log(err.message))
}

(async () => {
  const source = path.resolve(__dirname, '..', '..', '..', 'client', 'build')
  const destination = path.resolve(__dirname, '..', 'public')
  await copyClientApp(source, destination)
})()
