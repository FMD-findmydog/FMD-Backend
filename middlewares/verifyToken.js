exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    console.log(req.decoded)
    return next()
  } catch (error) {
    if (error.name === 'TokenExpireError') {
      return res.json(419, {
        isSuccess: false,
        code: 419,
        message: '토큰이 만료되었습니다.',
        result: false,
      })
    }
    return res.json(401, {
      isSuccess: false,
      code: 401,
      message: '유효하지 않은 토큰입니다.',
      result: false,
    })
  }
}
