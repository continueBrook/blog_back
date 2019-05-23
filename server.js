const express = require('express')
const body    = require('body-parser')

let server = express()
server.listen(3000)
server.use(body.urlencoded({extended:true}));
server.use(body.json());

server.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','http://47.104.216.90');
    next();
})


server.use('/regin',require('./router/regin'))
server.use('/login',require('./router/login'))
server.use('/edit',require('./router/edit'))
server.use('/person',require('./router/person'))
server.use('/articleShow',require('./router/articleShow'))
server.use('/comment',require('./router/comment'))
server.use('/index',require('./router/index'))