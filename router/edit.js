const express = require('express')
const db = require('../libs/db')
const multer = require('multer')
const fs = require('fs')
const url = require('url')
const qiniu = require('qiniu')
const accessKey = 'x2wvg_1cuqIUtyYqiJiLQK_bEMEdkOVSEadb2kvo'
const secretKey = '33DTRVgOBB_Y2xCs8kjjXV_kSlsI2zXQldVmsBx_'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
    scope: 'brook',
    expires: 7200
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken=putPolicy.uploadToken(mac);

let router = express.Router()
let multerObj = multer({dest:'./picture'})
router.use(multerObj.any())

router.post('/',(req,res) => {
    var localFile = `./picture/${req.files[0].filename}`
    var formUploader = new qiniu.form_up.FormUploader()
    var putExtra = new qiniu.form_up.PutExtra();
    var key=null;
    // 文件上传
    formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
    respBody, respInfo) {
    if (respErr) {
        throw respErr;
    }
    if (respInfo.statusCode == 200) {
        console.log(respBody);
        res.json({
            "errno": 0,
            "data": [
                `http://prj9sogrn.bkt.clouddn.com/${respBody.hash}`
            ]
        })
    } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
    }
    });
    fs.unlink(`./picture/${req.files[0].filename}`,(err) =>{
        if(err){
            console.log('失败了')
        }
    })
})
router.post('/insertArticle',(req,res) =>{
    db.query(`INSERT INTO user_article (id,drafid,user,article,title,time,type) VALUES (0,'${req.body.drafid}','${req.body.user}','${req.body.article}','${req.body.title}',${req.body.time},${req.body.type})`,(err,data) => {
        if(err){
            res.json({msg:'insert error',code:0})
        }else{
            db.query(`DELETE FROM user_draf WHERE drafid = '${req.body.drafid}'`,(err,data) =>{
                if(err){
                     res.json({msg:'insert error',code:0})
                }else{
                     res.json({msg:'insert delete both ok',code:1})
                }
            })
        }
    })
})
router.post('/insertDraf',(req,res) => {
    db.query(`SELECT * FROM user_draf where drafid='${req.body.drafid}'`,(err,data) => {
        if(err){
            res.json({msg:'error'})
        }else if(data.length == 0){
            db.query(`INSERT INTO user_draf (id,drafid,user,article,title,time,type) VALUES (0,'${req.body.drafid}','${req.body.user}','${req.body.article}','${req.body.title}',${req.body.time},${req.body.type})`,(err,data) => {
                if(err){
                    res.json({msg:'insert error',code:0})
                }else{
                    res.json({msg:'insert ok',code:1})
                }
            })
        }else{
            db.query(`UPDATE user_draf SET article = '${req.body.article}',title = '${req.body.title}' WHERE drafid = '${req.body.drafid}'`,(err,data) => {
                if(err){
                    res.json({msg:'update error',code:0})
                }else{
                    res.json({msg:'update ok',code:1})
                }
            })
        }
    })
 })
 router.get('/showDraf',(req,res) =>{
    let {query} = url.parse(req.url,true)
    let {drafid} = query
    db.query(`SELECT * FROM user_draf WHERE drafid='${drafid}'`,(err,data) =>{
        if(err){
            res.json({msg:'error',code:0})
        }else{
           res.json({msg:data})
        }
    })
})
 router.get('/:id',(req,res) =>{
     db.query(`SELECT * FROM user_draf WHERE drafid='${req.params.id}'`,(err,data) =>{
         if(err){
             res.json({msg:'error',code:0})
         }else{
            res.json({msg:data})
         }
     })
 })

module.exports = router