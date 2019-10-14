const db = require('./mysql').getConn()

const createTableMahasiswa = `
    CREATE TABLE IF NOT EXISTS mahasiswa
    (
        id INT NOT NULL AUTO_INCREMENT,
        npm VARCHAR(255),
        nama VARCHAR(255),
        imageURL TEXT, 
        PRIMARY KEY (id)
    );
`

console.log('create table mahasiswa ...')
db.query(createTableMahasiswa)
db.end(err => {
    if (err) console.error(err)
    console.log("migration finished")
})