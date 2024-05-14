const {DB_URL , userSchema , Url} = require('../models/db');
const mongoose = require('mongoose');
const router = require('express').Router();

const urlPattern = new RegExp('^(https?://)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
const pattern = /[^a-zA-Z0-9_]/;

router.post('/' , async(req , res , next) => {
    await mongoose.connect(DB_URL);
    if (!urlPattern.test(req.body.urlInput)){
        res.status('404').send('Not a valid Email');
    }
    if (pattern.test(req.body.aliasInput)) {
        res.status('404').send('Alias contains invalid characters');
    }
    else{
    let newUrl = new Url({
    url : req.body.urlInput,
    alias : req.body.aliasInput,
    })
    let url = await newUrl.save();
    console.log(url);
    mongoose.disconnect();
    res.redirect('/');
}
})
module.exports = router;