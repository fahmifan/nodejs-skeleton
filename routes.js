const { Router } = require("express")

class Routes {
    constructor() {
        this.r = Router()

        // bind methods to this
        this.getRoutes = this.getRoutes.bind(this)
        this.registerUserService = this.registerUserService.bind(this)
    }

    registerUserService(r) {
        this.userService = r
    }

    registerAuthService(r) {
        this.authService = r
    }

    registerAuthMiddleware(r) {
        this.authMiddleware = r
    }

    getRoutes() {
        this.r.get("/ping", (req, res) => res.status(200).json({ "ping": "pong" }))

        // auth
        this.r.post("/login", this.authService.login)

        // users
        this.r.post("/users", this.authMiddleware.adminOnly, this.userService.create)
        this.r.get("/users", this.authMiddleware.adminOnly, this.userService.findAll)
        this.r.delete("/users/:id", this.authMiddleware.adminOnly, this.userService.delete)
        this.r.put("/users/:id", this.authMiddleware.adminOnly, this.userService.update)

        return this.r
    }
}

module.exports = Routes