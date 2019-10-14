const path = require('path')

const multer = require('multer');
const crypto = require('crypto');

// serve upload middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        const name = file.fieldname + Date.now()
        const hashed = crypto.createHash('md5').update(name ).digest("hex");
        cb(null, hashed + path.extname(file.originalname))
    }
})

const MulterUploader = multer({ storage: storage })
module.exports = MulterUploader