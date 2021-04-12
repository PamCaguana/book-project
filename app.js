const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars') //sets up our template engine
const connectDB = require('./config/db')

// Load config
//path loads the port
dotenv.config({ path: './config/config.env' })

//calls it
connectDB()

// Initialize our app
const app = express()

// Logging
// morgan is middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
// this adds middleware for it
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' })) //default layout added after copy/paste 
app.set('view engine', '.hbs')

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))