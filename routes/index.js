const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//@description  Login/Landing Page
//@route        GET /
//add middleware as a second argument
router.get('/', ensureGuest, (req, res)=>{
    res.render('login', {
        layout: 'login',
    })
})

//@description      Dashboard
//@route            GET /dashboard
router.get('/dashboard', ensureAuth, (req,res)=>{
    res.render('dashboard', {
        name: req.user.firstName,
    })
})


//export this router
module.exports = router