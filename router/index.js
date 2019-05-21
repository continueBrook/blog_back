const express = require('express')
const db = require('../libs/db')

let router = express.Router()

router.post('/',(req,res) =>{
    db.query(`SELECT * FROM user_article`,(err,data) => {
        if(err){
            res.json({msg:'error',code:0})
        }else{
            res.json({msg:data,code:1})
        }
    })
})

module.exports = router