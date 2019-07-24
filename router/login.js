const express = require('express')
const db = require('../libs/db')
const cookieParser = require('cookie-parser')
const sessionParser = require('express-session')
const uuid = require('uuid/v4')
const cors = require('cors') //解决跨域
const time = 1000 * 60 * 60 * 24 *7
const md5_2 = require('../secret/md5')

let router = express.Router()
var corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
  }
router.use(cors(corsOptions))
router.use(cookieParser())
router.use(sessionParser({
    genid: function(req) {
        return uuid() 
    },
    name:'sessionid',
    secret:'zheshiyiduanmiyao',
    cookie:{maxAge:time}
}))

router.post('/',(req,res) => {
    let {name:name,pass:pass} = req.body
    console.log(req.session)
    db.query(`SELECT * FROM user_table WHERE sessionid = '${req.sessionID}'`,(err,data) =>{
        if(err){
            res.json({msg:'login_session err',code:0})
        }else if(data.length == 0){
            db.query(`SELECT pass FROM user_table WHERE user = '${name}'`,(err,data) => {
                if(err){
                    res.json({msg:'login error',code:0})
                }else if(data.length == 0){
                    res.json({msg:'login no user',code:0,err:'user'})
                }else if(data[0].pass != md5_2(pass)){
                    res.json({msg:'pass is not correct',code:0,err:'pass'})
                }else{
                    db.query(`UPDATE user_table SET sessionid = '${req.sessionID}' WHERE user = '${name}'`,err =>{
                        if(err){
                            res.json({msg:'err'})
                        }else{
                            res.json({msg:'login success',name:name,code:1,timeStamp:new Date().getTime(),time:time})
                        }
                    })
                }
            })
        }else{
            res.json({msg:'login with session',name:data[0].user,code:1,timeStamp:new Date().getTime(),time:time})
        }
    })
})
router.post('/logout',(req,res) => {
    req.session.destroy(function(err){
        if(err){
            console.log("退出失败!");
            return;
        }
        //清除登录cookie
        res.clearCookie('sessionid')
        res.json({msg:'delete cookie',code:0})
    })
})
module.exports = router