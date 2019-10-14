const port = process.env.HTTP_PORT || 3000
const baseURL = process.env.BASE_URL || `http://localhost:${port}`
class Upload {
    constructor() {
        this.image = this.image.bind(this)
    }

    image(req, res) {
        const file = req.file
        if (!file) return res.status(400).json({"error": "not a file"})
        res.status(200).json({ "path": `${baseURL}/upload/${file.filename}` })
    }
}

module.exports = Upload