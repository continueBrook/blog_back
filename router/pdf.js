const fs = require('fs');
const moment = require('moment'); // moment.js
const express = require('express')


const create = require('../libs/html2pdf'); // 引入写好的函数
const options = {
    "format": 'A4',
    "header": {
    "height": "10mm",
    "contents": ''
}}; // 一些配置
const name = '张三';
// 匹配规则
const reg = [
  {
    relus: /__name__/g,
    match: name
  },
  {
    relus: /__date__/g,
    match: moment().format('YYYY年MM月DD日')
  }
];
const html = fs.readFileSync('./dist/test.html', 'utf8'); // 引入html模板
let router = express.Router()
router.get('/a',(req,res) =>{
  create.createPDFProtocolFile(html, options, reg, './test.pdf').then(() =>{
      res.download('./test.pdf','file.pdf',err =>{
        if(err){
          console.log('失败啦')
        }else{
          fs.unlink('./test.pdf',err =>{
            if(err){
              console.log('err')
            }
          })
        }
      })
  })
})

module.exports = router
