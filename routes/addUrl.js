const {DB_URL , userSchema , Url} = require('../models/db');
const mongoose = require('mongoose');
const router = require('express').Router();

const urlPattern = new RegExp('^(https?://)?'+
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
    '((\\d{1,3}\\.){3}\\d{1,3}))'+
    '(\\:\\d+)?(/[-a-z\\d%_.~+]*)*'+
    '(\\?[;&a-z\\d%_.~+=-]*)?'+
    '(\\#[-a-z\\d_]*)?$','i');
const aliasPattern = /[^a-zA-Z0-9_]/;

router.post('/',
    validateUrl,
    validateAlias,
    saveData,
    updateData
);

// URL check
function validateUrl(req, res, next) {
    if (!urlPattern.test(req.body.urlInput)) {
        res.status(400).send('Not a valid URL');
    } else {
        console.log(1);
        next();
    }
}

// Alias check
function validateAlias(req, res, next) {
    if (aliasPattern.test(req.body.aliasInput)) {
        res.status(400).send('Alias contains invalid characters');
    } else {
        console.log(2);
        next();
    }
}
//saving Data
async function saveData(req, res, next) {
    try {
        await mongoose.connect(DB_URL);
        const oldUrl = await Url.findOne({ url: req.body.urlInput });
        if (!oldUrl) {
            let newUrl = new Url({
                url: req.body.urlInput,
                alias: req.body.aliasInput
            });
            await newUrl.save();
            mongoose.disconnect();
            res.redirect('/');
        } else {
            console.log(3);
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}
//updating data
async function updateData(req ,res){
    try {
        await mongoose.connect(DB_URL);
        const oldUrl = await Url.updateOne({ alias : req.body.aliasInput });
        mongoose.disconnect();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}
module.exports = router;
// make alias optional
// if there is an alias input => convert it into link 
// if not => make a link 
