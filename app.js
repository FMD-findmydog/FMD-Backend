const app = require('express')

app.get('/', (req, res) => {
  res.status(200).send('<h1>hello</h1>')
})

app.listen(3000, () => {
  console.log('server is running..')
})
