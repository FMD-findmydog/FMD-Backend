const passport = require('passport')
const kakao = require('./kakaoStrategy')
const db = require('../models/index')
const { User } = db

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err))
  })
  kakao()
}
