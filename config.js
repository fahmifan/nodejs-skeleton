exports.dbName = () => process.env.DB_NAME || 'mobile'

exports.jwtSecret = () => process.env.JWT_SECRET || 'secret'

// tokenExpiry in seconds
exports.tokenExpiry = () => Number.parseInt(process.env.TOKEN_EXPIRY) || 60 * 60

module.exports = exports
