const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const hbs = require('handlebars')

const config = require('./config')
const mongodb = require('./db/mongodb')
const Routes = require('./routes')
const httpsvc = require('./httpsvc')
const UserRepo = require('./repository/mongodb/user_repository')

const app = express()
const port = process.env.HTTP_PORT || 3000

// create application/json parser
app.use(bodyParser.json({ type: 'application/json' }))

// setup express to use handlebars template engine
app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'hbs')

// main function wiring the app
async function main() {
    try { 
        
        // init repositories
        const mongoclient = await mongodb.connect()
        const userRepo = new UserRepo(mongoclient.db(config.dbName()))
        
        // init services
        const authService = new httpsvc.AuthService(userRepo)
        const userService = new httpsvc.UserService(userRepo)

        // init routes
        const routes = new Routes()
        routes.registerUserService(userService)
        routes.registerAuthService(authService)
        routes.registerAuthMiddleware(httpsvc.AuthMiddleware)

        // serve public folder
        app.use('/', express.static(path.join(__dirname, 'public')))
        // serve upload endpoint
        app.use('/upload', express.static(path.join(__dirname, 'upload')))
        // serve api endpoint
        app.use('/api', routes.getRoutes())
        // views endpoint
        app.get('/', (req, res) => res.render('login'))
        app.get('/admin/dashboard', (req, res) => res.render('admin_dashboard'))
        app.get('/user/dashboard', (req, res) => res.render('user_dashboard'))

        // create default admin
        const ok = await userService.createDefaultAdmin()
        if (ok) {
            console.log('default admin created')
        }

        // start server
        app.listen(port, () => console.log(`listening on ${port}`))
    } catch(err) {
        console.error(err)
    }
}

// start main
main()