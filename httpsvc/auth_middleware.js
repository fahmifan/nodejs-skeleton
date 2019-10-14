const tokenUtil = require('../utils/token')
const userModel = require('../model/user')

exports.anyOne = (req, res, next) => {
    try {
        const token = getToken(req)
        if (!token) {
            return res.status(401).json({ error: 'unauthorized' })
        }

        const parsed = tokenUtil.parse(token)
        if (!parsed) {
            return res.status(401).json({ error: 'unauthorized' })
        }

        return next()
    } catch (err) {
        console.error(err)
        return res.status(401).json({ error: 'unauthorized' })
    }
}

exports.adminOnly = (req, res, next) => {
    try {
        const token = getToken(req)
        if (!token) {
            return res.status(401).json({ error: 'unauthorized' })
        }

        const parsed = tokenUtil.parse(token)
        if (!parsed) {
            return res.status(401).json({ error: 'unauthorized' })
        }

        if (parsed.role != userModel.RoleAdmin()) {
            return res.status(401).json({ error: 'unauthorized' })
        }

        return next()
    } catch (err) {
        console.error(err)
        return res.status(401).json({ error: 'unauthorized' })
    }
}

const getToken = (req) => {
    const authHeaders = req.headers["authorization"].split(' ');
    if (authHeaders.length < 2 || !authHeaders[0] === 'Bearer') {
        throw new Error('unathorized')
    }

    return authHeaders[1]
}

module.exports = exports
