const express = require('express')
const db = require('../libs/db')

let router = express.Router()

router.post('/',(req,res) =>{
    let {user:user,articleId:articleId,commentId:commentId,content:content} = req.body
    db.query(`INSERT INTO user_comment (id,user,articleId,commentId,content,isShow_res,isShow,isParent,thumbs) VALUES (0,'${user}','${articleId}','${commentId}','${content}',0,0,0,0)`,(err,data) =>{
        if(err){
            res.json({msg:'error',code:0})
        }else{
            res.json({msg:'insert ok',code:1})
        }
    })
})
router.post('/getData',(req,res) =>{
    let {articleId:articleId} = req.body
    db.query(`SELECT * FROM user_comment WHERE articleId = '${articleId}'`,(err,data) =>{
        if(err){
            res.json({msg:'select err',code:0})
        }else if(data){
            db.query(`UPDATE user_comment SET isShow = '1' WHERE articleId = '${articleId}'`,(err) =>{
                if(err){
                    res.json({msg:'insert err',code:0})
                }else {
                    res.json({msg:data})
                }
            })
        }
    })
    
})
router.post('/getData_2',(req,res) =>{
    let {commentId:commentId} = req.body
    db.query(`SELECT * FROM user_comment WHERE belongId = '${commentId}'`,(err,data) =>{
        if(err){
            res.json({msg:'select err',code:0})
        }else if(data){
            res.json({msg:data})
        }
    })
})
router.post('/response',(req,res) =>{
    let {user:user,articleId:articleId,commentId:commentId,belongComment:belongComment,belongId:belongId,belongUser:belongUser,content:content} = req.body
    db.query(`INSERT INTO user_comment (id,user,articleId,commentId,belongComment,belongId,belongUser,content,isShow_res,isShow,isParent,thumbs) VALUES (0,'${user}','${articleId}','${commentId}','${belongComment}','${belongId}','${belongUser}','${content}',0,0,0,0)`,(err,data) =>{
        if(err){
            res.json({msg:'error',code:0})
        }else{
            db.query(`UPDATE user_comment SET isParent = 1 WHERE commentId = '${belongId}'`,(err) =>{
                if(err){
                    res.json({msg:'error update',code:0})
                }else{
                    res.json({msg:'insert update ok',code:1})
                }
            })
        }
    })
})
router.post('/getThumbsUp',(req,res) =>{
    let {user:user} = req.body
    db.query(`SELECT * FROM user_table WHERE user = '${user}'`,(err,data) =>{
        if(err){
            res.json({msg:'select err',code:0})
        }else if(data){
            res.json({msg:data})
        }
    })
})
router.post('/getThumbs',(req,res) =>{
    let {commentId:commentId} = req.body
    db.query(`SELECT * FROM user_comment WHERE commentId = '${commentId}'`,(err,data) =>{
        if(err){
            res.json({msg:'select err',code:0})
        }else if(data){
            res.json({msg:data})
        }
    })
})
router.post('/thumbsUp',(req,res) =>{
    let {commentId:commentId,user:user} = req.body
    db.query(`UPDATE user_comment SET thumbs= thumbs +1 WHERE commentId = '${commentId}'`,(err) =>{
        if(err){
            res.json({msg:'error update',code:0})
        }else{
            commentId = commentId+';'
            db.query(`UPDATE user_table SET thumbsList= concat(thumbsList,'${commentId}') WHERE user = '${user}'`,(err) =>{
                if(err){
                    res.json({msg:'error update',code:0})
                }else{
                    res.json({msg:'insert update ok',code:1})
                }
            })
        }
    })
})
router.post('/thumbsDown',(req,res) =>{
    let {commentId:commentId,user:user} = req.body
    db.query(`UPDATE user_comment SET thumbs= thumbs -1 WHERE commentId = '${commentId}'`,(err) =>{
        if(err){
            res.json({msg:'error update',code:0})
        }else{
            commentId = commentId+';'
            db.query(`UPDATE user_table SET thumbsList= replace(thumbsList,'${commentId}','') WHERE user = '${user}'`,(err) =>{
                if(err){
                    res.json({msg:'error update',code:0})
                }else{
                    res.json({msg:'insert update ok',code:1})
                }
            })
        }
    })
})

module.exports = router