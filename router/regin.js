const express = require('express')
const db = require('../libs/db')
const cors = require('cors')
const md5_2 = require('../secret/md5')

let router = express.Router()
let corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
  }
router.use(cors(corsOptions))

router.post('/',(req,res) => {
    let {name:name,pass:pass} = req.body
    db.query(`SELECT * FROM user_table WHERE user = '${name}'`,(err,data) =>{
        if(err){
            res.json({msg:'fail',code:0})
        }else if(data.length != 0){
            res.json({msg:'exist user please login',code:0,err:'user'})
        }else{
            db.query(`INSERT INTO user_table (id,sessionid,user,pass) VALUES (0,null,'${name}','${md5_2(pass)}')`,(err,data) =>{
                if(err){
                    res.json({msg:'fail',code:0})
                }else{
                    res.json({msg:'suc insert',code:1})
                }
            })
        }
    })
})
module.exports = router