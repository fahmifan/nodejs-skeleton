// user role
exports.RoleAdmin = () => 0
exports.RoleNormal = () => 1

exports.NewUserCollection = () => "users"

exports.NewUser = ({
    id = 0,
    name = '',
    username = '',
    password = '',
    role = exports.RoleNormal(),
}) => ({ id, name, role, username, password })

module.exports = exports
