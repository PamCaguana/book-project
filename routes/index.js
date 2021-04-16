const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

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
router.get('/dashboard', ensureAuth, async (req,res)=>{
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        //documents returned from queries with lean option enabled are plain JS objects, not MongooseDocuments
        //they have no save method, getters/setters or other Mongoose magil applied
        res.render('dashboard', {
            name: req.user.firstName,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
    
})


//export this router
module.exports = router