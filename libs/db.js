const mysql = require('mysql')

let db = mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'blog'
})

module.exports = db