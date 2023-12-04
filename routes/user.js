const express = require('express');
const router = express.Router();
const userController = require('../controller/user-controller')
const { verifyToken } = require('../middlewares/verifyToken')

router.post('/join', userController.insertUser)
router.post('/login', userController.login)
router.get('/check-join-email/:email', userController.isExistEmail)
router.get('/check-join-nickname/:nickname', userController.isExistNickname)
router.post('/auth', verifyToken, userController.auth)

module.exports = router;