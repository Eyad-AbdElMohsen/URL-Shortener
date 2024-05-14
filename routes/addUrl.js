const {DB_URL , userSchema , Url} = require('../models/db');
const mongoose = require('mongoose');
const router = require('express').Router();
router.post('/' , async(req , res , next) => {
    await mongoose.connect(DB_URL);
    let newUrl = new User({
    urlInput: req.body.urlInput,
    aliasInput: req.body.aliasInput,
    })
    let url = await newUrl.save();
    console.log(url);
    mongoose.disconnect();
    res.redirect('/');
})
module.exports = router;