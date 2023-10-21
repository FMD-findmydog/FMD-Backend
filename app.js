const express = require('express')
const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.status(200).send('<h1>hello</h1>')
})

app.listen(port, () => {
  console.log('server is running..')
})
