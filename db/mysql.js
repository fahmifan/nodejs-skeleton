const mysql = require("mysql")


exports.getConn = () => {
    const mysqlDSN = "mysql://root:root@localhost:3306/mobcom2"
    const conn = mysql.createConnection(mysqlDSN)

    conn.ping(() => {
        console.log("connected to mysql")
    })

    return conn
}