const express = require('express')
const db = require('../libs/db')
const url = require('url')

let router = express.Router()

router.get('/',(req,res) =>{
    let {start:start,end:end} = url.parse(req.url,true).query
    db.query(`SELECT * FROM user_article limit ${start},${end}`,(err,data) => {
        if(err){
            res.json({msg:'error',code:0})
        }else{
            res.json({msg:data,code:1})
        }
    })
})

module.exports = router