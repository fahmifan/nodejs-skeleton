const jwt = require('jsonwebtoken')
const config = require('../config')

exports.generateFromUser = (user) => jwt.sign(user, config.jwtSecret(), {
    expiresIn: config.tokenExpiry(), 
});

// parse parse the token
exports.parse = (token) => {
    try {
        const parsed = jwt.verify(token, config.jwtSecret())
        return parsed
    } catch (err) {
        console.error(err)
        throw err   
    }
}

module.exports = exports