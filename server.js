const express = require('express')
const body    = require('body-parser')
const router  = require('./router/app')

let server = express()
server.listen(3000)
server.use(body.urlencoded({extended:true}));
server.use(body.json());

server.use((req,res,next) => {
    const { origin, Origin, referer, Referer } = req.headers;
    let allowOrigin = origin || Origin || referer || Referer
    // 设置允许访问源
    res.setHeader('Access-Control-Allow-Origin',allowOrigin);
    next();
})
router(server)

server.use(express.static('./dist'))
