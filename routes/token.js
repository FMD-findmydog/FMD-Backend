const express = require('express');
const router = express.Router();
const app = express();
const db = require('../models/index');
const {User} = db;
const jwt = require('jsonwebtoken');
const {verifyToken} = require('../middlewares/verifyToken');
require('dotenv').config();

//login
router.post('/', async (req, res, next) => {
  const {email, password} = req.body;
  if (email) {
    const targetUser = await User.findOne({where: {Email: email}});

    const dbPassword = targetUser.dataValues.password;
    let match = await bcryptService.decrypt(password, dbPassword);
    const nickname = targetUser.dataValues.nickname;
    if (match) {
      const userIdx = targetUser.dataValues.id;
      //토큰 생성
      token = jwt.sign(
        {
          type: 'JWT',
          nickname: nickname,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1m', // 만료시간 15분
          issuer: '토큰발급자',
        },
      );
      res.json(200, {
        isSuccess: true,
        code: 1000,
        message: '성공',
        result: {
          userIdx: userIdx,
          token: token,
        },
      });
    } else {
      res.json(404, {
        isSuccess: false,
        code: 1000,
        message: '실패',
        result: false,
      });
    }
  }
});

router.get('/test', verifyToken, (req, res) => {
  res.json(req.locals.decoded);
});

module.exports = router;
