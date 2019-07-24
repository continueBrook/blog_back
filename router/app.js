function app(server){
    server.use('/index',require('./index'))
    server.use('/regin',require('./regin'))
    server.use('/login',require('./login'))
    server.use('/edit',require('./edit'))
    server.use('/person',require('./person'))
    server.use('/articleShow',require('./articleShow'))
    server.use('/comment',require('./comment'))
    server.use('/pdf',require('./pdf'))
}
module.exports = app