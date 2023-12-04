const passport = require('passport')
const db = require('../models/index')
const KakaoStrategy = require('passport-kakao').Strategy
require('dotenv').config();
const { User } = db

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          })
          if (exUser) {
            done(null, exUser) //로그인 성공
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kaccount_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            })
            done(null, newUser)
          }
        } catch (error) {
          console.error(error) //로그인 실패
          done(error)
        }
      }
    )
  )
}
