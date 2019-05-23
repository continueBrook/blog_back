const mysql = require('mysql')

let db = mysql.createPool({
    host:'47.104.216.90',
    port:'3306',
    user:'root',
    password:'123456',
    database:'blog'
})

module.exports = db