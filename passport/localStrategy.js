const bcrypt = require('bcrypt');
const pool = require('../database/pool')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportConfig = { usernameField: 'email', passwordField: 'password' };
const passportVerify = async (email, password, done) => {
  try {
    const user = await pool.query(`select userIdx, email, nickName, password from user where email="${email}"`);

    if (user[0].length === 0) {
      done(null, false, { reason: '존재하지 않는 사용자 입니다.' });
      return;
    }

    // console.log(password, user[0][0].password)
    const compareResult = await bcrypt.compare(password, user[0][0].password);

    if (compareResult) {
      done(null, user[0][0]);
      return;
    }

    done(null, false, { reason: '올바르지 않은 비밀번호 입니다.' });
  } catch (error) {
    // console.error(error);
    done(error);
  }
};

module.exports = () => {
    passport.use('local', new LocalStrategy(passportConfig, passportVerify));

}