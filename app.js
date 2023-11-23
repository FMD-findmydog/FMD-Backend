const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const app = express();
const port = 3000;
const db = require('./models/index');
const {User} = db;
const mysql = require('mysql2');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// const indexRouter = require('./index'); // = require('./routes/index')
const userRouter = require('./routes/user');
// app.use('/index', indexRouter);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/user', userRouter);

app.get('/db', (req, res) => {
  connection.query('SELECT * FROM user', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`);
});
