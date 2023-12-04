const userService = require('../service/user-service')
const bcryptService = require('../service/bcrypt-service')
const passport = require('passport')
const jwt = require('jsonwebtoken')

exports.insertUser = async(req, res, next) => {
    console.log(req.body)
    let {email, password, nickname} = req.body;

    try {
        let emailExist = await userService.isExist(email, "email")
        let nicknameExist = await userService.isExist(nickname, "nickname")
        console.log(emailExist, nicknameExist)
        if(emailExist && nicknameExist) {
            let hashpw = await bcryptService.encrypt(password)
            console.log("hashpw: ", hashpw)
            let result = await userService.insertUser(email, nickname, hashpw)
            console.log(result)
            if(result) {
                return res.status(200).json({message:"성공"})
            }
            else{
                return res.status(400).json({message:"실패"})
            }
        } else{
            return res.status(400).json({message:"이메일 또는 닉네임 중복 실패"})
        }
    } catch(err) {
        return res.status(500).json(err)
    }
}

exports.isExistEmail = async(req, res, next) => {
    let {email} = req.params;
    try{
        let emailExist = await userService.isExist(email, "email");
        if(emailExist) {
            return res.status(200).json({message:"성공"})
        }
        else{
            return res.status(400).json({message:"이미 사용중인 이메일입니다"})
        }
    } catch(err) {
        return res.status(500).json(err)
    }
}

exports.isExistNickname = async(req, res, next) => {
    let {nickname} = req.params;
    try{
        let nicknameExist = await userService.isExist(nickname, "nickname")
        if(nicknameExist) {
            return res.status(200).json({message:"성공"})
        }
        else{
            return res.status(400).json({message:"이미 사용중인 닉네임입니다"})
        }
    } catch(err) {
        return res.status(500).json(err)
    }
}

const pool = require('../database/pool')
/**
 * 로그인 시 비밀번호 확인 방법!! 아래 코드 참고!!
 * bcrypt-service를 불러온 다음에 그 안에 있는 함수인 decrypt 사용 
 * - 매개변수로는 password(지금 입력받은 비밀번호), hashpw(디비에서 꺼낸 비번)을 입력!!
 * 여기서 쿼리문으로 email으로 검색하고 email, password를 받아서 password를 비교하면 됩니다!
 * 만약에 일치한다면 decrypt에서는 true, 아니면 false를 리턴해요
 */
exports.login = async(req, res, next) => {
    // console.log(req.body)
    // let {email, password} = req.body;
    try{
        passport.authenticate('local', (passportError, user, info) => {
            if(passportError || !user){
                res.json(404, {
                    isSuccess: false,
                    code: 1000,
                    message: info.reason,
                    result: false,
                })
                return; 
            }
        
            req.login(user, {session:false}, (loginError) => {
                if(loginError){
                    res.send(loginError);
                    return;
                }
                const token = jwt.sign(
                    {
                        type: 'JWT',
                        nickname: user.nickname
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1m', // 만료시간 15분
                        issuer: '토큰발급자',
                    }
                );
                // console.log(user.email, user.password)
                res.json(200, {
                    isSuccess: true,
                    code: 1000,
                    message: '성공',
                    result: {
                      userIdx: user.userIdx,
                      token: token,
                    },
                  });
            });
        })(req, res);
    } catch(error){
        console.error(error);
        next(error);
    }
}

exports.auth = async(req, res, next) => {
    try {
	    res.json({ result: true });
	} catch (error) {
	    console.error(error);
	    next(error);
	}
}