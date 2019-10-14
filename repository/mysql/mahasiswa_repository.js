class MahasiswaRepository {
    constructor(db) {
        this.db = db

        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.findAll = this.findAll.bind(this)
        this.delete = this.delete.bind(this)
    }

    create(user) {
        return new Promise((resolve, reject) => {
            const q = `INSERT INTO mahasiswa (npm, nama, imageURL) VALUES(?, ?, ?)`
            this.db.query(q, [user.npm, user.nama, user.imageURL], (error, results) => {
                if (error) {
                    reject(error)
                    return
                }

                user.id = results.insertId
                resolve(user)
            })
        })
    }

    update(mhs, id) {
        return new Promise((resolve, reject) => {
            const q = `UPDATE mahasiswa SET npm = ?, nama = ?, imageURL = ? WHERE id = ?`
            this.db.query(q, [mhs.npm, mhs.nama, mhs.imageURL, id], (error) => {
                if (error) {
                    reject(error)
                    return
                }

                mhs.id = Number.parseInt(id, 10)
                resolve(mhs)
            })
        })
    }

    findAll() {
        return new Promise((resolve, reject) => {
            const q = `SELECT * FROM mahasiswa`
            this.db.query(q, (err, res) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(res)
            })
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM mahasiswa WHERE id = ?`
            this.db.query(q, [id], (err, res) => {
                if (err) {
                    reject(err)
                    return
                }

                resolve(res)
            })
        })
    }

    deleteMultiple(ids = []) {
        return new Promise((resolve, reject) => {
            const q = `DELETE FROM mahasiswa WHERE id = ?`
            this.db.beginTransaction(err => {
                if (err) {
                    reject(err)
                    return
                }

                // delete by ids
                ids.forEach(id => {
                    this.db.query(q, [id], err => {
                        if (err) {
                            this.db.rollback()
                            reject(err)
                            return
                        }
                    })            
                });

                this.db.commit(err => {
                    if (err) {
                        this.db.rollback()
                        reject(err)
                        return
                    }

                    resolve()
                })
            })
        })
    }
}

module.exports = MahasiswaRepository