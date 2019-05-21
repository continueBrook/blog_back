const express = require('express')
const db = require('../libs/db')

let router = express.Router()

router.get('/:id',(req,res) =>{
    db.query(`SELECT * FROM user_article where drafid = '${req.params.id}'`,(err,data) => {
        if(err){
            res.json({msg:'error',code:0})
        }else{
            res.json({msg:data,code:1})
        }
    })
})
router.post('/agree',(req,res) =>{
    let {drafid:drafid,user:user} = req.body
    db.query(`UPDATE user_article SET agreeList = agreeList + 1 WHERE drafid = '${drafid}'`,err =>{
        if(err){
            res.json({msg:'error',code:0})
        }else{
            let id = drafid+';'
            db.query(`UPDATE user_table SET agreeList = concat(agreeList,'${id}') WHERE user = '${user}'`,err =>{
                if(err){
                    res.json({msg:'error2',code:0})
                }else{
                    db.query(`SELECT * FROM user_article WHERE drafid = '${drafid}'`,(err,data) => {
                        if(err){
                            res.json({msg:'error3',code:0})
                        }else{
                            res.json({msg:data,code:1})
                        }
                    })
                }
            })
        }
    })
})
router.post('/agreeToggle',(req,res) =>{
    let {drafid:drafid,user:user} = req.body
    db.query(`UPDATE user_article SET agreeList = agreeList - 1 WHERE drafid = '${req.params.id}'`,err =>{
        if(err){
            res.json({msg:'error',code:0})
        }else{
            db.query(`SELECT * FROM user_article WHERE drafid = '${req.params.id}'`,(err,data) => {
                if(err){
                    res.json({msg:'error2',code:0})
                }else{
                    res.json({msg:data,code:1})
                }
            })
        }
    })
})
router.post('/disagree',(req,res) =>{
    let {drafid:drafid,user:user} = req.body
    db.query(`UPDATE user_article SET disagreeList = disagreeList + 1 WHERE drafid = '${req.params.id}'`,err =>{
        if(err){
            res.json({msg:'error',code:0})
        }else{
            db.query(`SELECT * FROM user_article WHERE drafid = '${req.params.id}'`,(err,data) => {
                if(err){
                    res.json({msg:'error2',code:0})
                }else{
                    res.json({msg:data,code:1})
                }
            })
        }
    })
})
router.post('/disagreeToggle',(req,res) =>{
    let {drafid:drafid,user:user} = req.body
    db.query(`UPDATE user_article SET disagreeList = disagreeList - 1 WHERE drafid = '${req.params.id}'`,err =>{
        if(err){
            res.json({msg:'error',code:0})
        }else{
            db.query(`SELECT * FROM user_article WHERE drafid = '${req.params.id}'`,(err,data) => {
                if(err){
                    res.json({msg:'error2',code:0})
                }else{
                    res.json({msg:data,code:1})
                }
            })
        }
    })
})

module.exports = router