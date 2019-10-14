const userModel = require('../model/user')

class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo

        this.create = this.create.bind(this)
        this.findAll = this.findAll.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.deleteMultiple = this.deleteMultiple.bind(this)
    }

    // createDefaultAdmin for demo purpose only
    // this will create default admin account with
    // username: admin
    // password: 123
    async createDefaultAdmin() {
        const user = userModel.NewUser({ 
            password: '123',
            username: 'admin',
            name: 'admin',
            role: userModel.RoleAdmin(),
        })

        try {
            await this.userRepo.create(user)    
            return true
        } catch (err) {
            return false
        }
    }

    async create(req, res) {
        const { name, username, password } = req.body
        const user = userModel.NewUser({ password, username, name, role: userModel.RoleNormal() })

        try {
            const newUser = await this.userRepo.create(user)

            // hide user password
            user.password = ""
            delete user.password
    
            return res.status(200).json(newUser)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async findAll(req, res) {
        try {
            const users = await this.userRepo.findAll()
            return res.status(200).json(users)
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: error.message })
        }
    }

    async update(req, res) {
        const { name, username, password } = req.body
        const { id } = req.params
        const user = userModel.NewUser({ id, name, username, password })

        try {
            const updated = await this.userRepo.update(user, id)

            // hide password
            updated.password = ''
            delete updated.password

            return res.status(200).json(updated)
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: error.message })
        }
    }

    async delete(req, res) {
        const { id } = req.params
        try {
            await this.userRepo.delete(id)
            return res.status(200).json({ message: "ok" })
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: error.message })
        }
    }

    async deleteMultiple(req, res) {
        const { ids } = req.body
        try {
            await this.userRepo.deleteMultiple(ids)
            return res.status(200).json({ message: "ok" })
        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: error.message })
        }
    }
}

module.exports = UserService