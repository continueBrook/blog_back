const crypto = require('crypto')
const key = 'zheshiyiduanhenchanghenchangdekey'

function md5(str){
    let obj = crypto.createHash('md5')
    obj.update(str)
    return obj.digest('hex')
}
function md5_2(str){
    return md5(md5(str)+key)
}

module.exports = md5_2