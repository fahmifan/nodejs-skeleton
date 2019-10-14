const token = require('../utils/token')
const passwordUtil = require('../utils/password')

class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo

        this.login = this.login.bind(this)
    }

    async login(req, res) {
        const { username, password } = req.body
        try {
            const user = await this.userRepo.findUserByUsername(username)
            if (!passwordUtil.verify(password, user.password)) {
                return res.status(400).json({ error: 'not found' })
            }

            // hide password
            user.password = ''
            delete user.password

            return res.status(200).json({ user, token: token.generateFromUser(user) })
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }
}

const validatePassword = (password, hashed) => {
    return password === hashed
}

module.exports = AuthService