const express = require('express')
const urllib = require('url')
const db = require('../libs/db')

let router = express.Router()

router.get('/articleList',(req,res) => {
    let {query} = urllib.parse(req.url,true)
    db.query(`SELECT * FROM user_article where user = '${query.name}'`,(err,data) =>{
        if(err){
            res.json({msg:'err select',code:0})
        }else{
            res.json({msg:data,code:1})
        }
    })
})
router.get('/drafList',(req,res) => {
    let {query} = urllib.parse(req.url,true)
    db.query(`SELECT * FROM user_draf where user = '${query.name}'`,(err,data) =>{
        if(err){
            res.json({msg:'err select',code:0})
        }else{
            res.json({msg:data,code:1})
        }
    })
})

module.exports = router