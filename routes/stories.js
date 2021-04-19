const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

//@description  Show add Page
//@route        GET /stories/add
//add middleware as a second argument
router.get('/add', ensureAuth, (req, res)=>{
    res.render('stories/add')
})


//@description  Process add form
//@route        POST /stories
//add Body parser middleware to use req.body
router.post('/', ensureAuth, async (req, res)=>{
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

//export this router
module.exports = router