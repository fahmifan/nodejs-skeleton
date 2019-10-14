const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);

exports.hash = (password) => bcrypt.hashSync(password, salt)

exports.verify = (password, hashed) => bcrypt.compareSync(password, hashed)