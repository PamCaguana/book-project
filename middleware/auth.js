//middleware is just a function that has access to the req and res objects

module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        } //next is function we call when youre done doing whatever youre doing to call the next piece of middleware
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}

//lets bring these in to routes/index.js