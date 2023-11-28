const express = require('express')
const mysql = require('mysql')
const dbconfig = require('./config/database.js')
const connection = mysql.createConnection(dbconfig)
const app = express()
const port = 3000

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/user', userRouter) // 로컬 로그인 요청
app.use('/auth', authRouter) //kakao 로그인 요청

//token테스트용
const tokenTest = require('./routes/token.js')
app.use('/token', tokenTest)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/db', (req, res) => {
  connection.query('SELECT * FROM user', (error, rows) => {
    if (error) throw error
    console.log('User info is: ', rows)
    res.send(rows)
  })
})

app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`)
})
