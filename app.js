//app.js because if complete backend server side rendered application (vs server.js)
//MongoStore doesnt work because the vid uses older version of mongodb. use connect-mongo@3
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars') //sets up our template engine
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// Load config
//path loads the port
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

//calls it
connectDB()

// Initialize our app
const app = express()

// Body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging
// morgan is middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
// this adds middleware for it
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //default layout added after copy/paste 
app.set('view engine', '.hbs')

//Express-Session middleware
//place above passport middleware
app.use(session({
    secret: 'keyboard cat', //can be anything
    resave: false, //we dont want to save a session if nothing is modified
    saveUninitialized: false, //dont create a session until something is stored
    store: new MongoStore({ mongooseConnection: mongoose.connection }) //with this we can refresh without getting logged out
    // cookie: { secure: true} wont work without https
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Static folder
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))