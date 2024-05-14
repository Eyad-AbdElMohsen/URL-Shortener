const {DB_URL , userSchema , Url} = require('../models/db');
const mongoose = require('mongoose');
const router = require('express').Router();

router.get('/' , async ( req , res , next ) => {
    await mongoose.connect(DB_URL);
    let urls = await Url.find()
    res.render("../views/index.ejs" , {
        urls : urls
    })
    mongoose.disconnect();
})
module.exports = router