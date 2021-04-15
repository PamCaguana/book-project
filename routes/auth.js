const express = require('express')
const passport = require('passport')
const router = express.Router()

//@description  Authenticate with Google
//@route        GET /auth/google
//strategy created in the passport.js file
//we want the scope of whatever is included in the profile
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))//we link to auth in the app.js

//@description      Google auth callback
//@route            GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req,res) => {
    res.redirect('/dashboard')
})

// @description     Logout User
// @route           /auth/logout
//with Passport middleware once we log in we'll have a logout method on the request object, simply call it
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


//export this router
module.exports = router