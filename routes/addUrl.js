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
let alias;
let count = 0;
function* uniqueUrlGenerator() {
    while (true) {
      const randomString = Math.random().toString(36).substring(2, 8); // Generates a random 6-character string
    yield `localhost:3000/${randomString}`;
    }
}

router.post('/',
    validateUrl,
    validateAlias,
    saveData,
    updateData,
);

// URL check
function validateUrl(req, res, next) {
    if (!urlPattern.test(req.body.urlInput)) {
        res.status(400).send('Not a valid URL');
    } else {
        console.log("good url");
        next();
    }
}
// Alias check
function validateAlias(req, res, next) {
    alias = req.body.aliasInput;
    if(alias){
        if (aliasPattern.test(req.body.aliasInput)) {
            res.status(400).send('Alias contains invalid characters');
        } else {
            console.log("good alias");
            next();
        }
    }
    else{
        console.log('no alias')
        next();
    }
}
//saving Data
async function saveData(req, res, next) {
        try {
            await mongoose.connect(DB_URL);
            const oldUrl = await Url.findOne({ url: req.body.urlInput });
            if (!oldUrl) {
                let newUrl;
                if(alias){
                    console.log("new url with alias");
                    newUrl = new Url({
                        url: req.body.urlInput,
                        alias: `localhoset:3000/${req.body.aliasInput}`
                    });
                }
                else{
                    const NEW = uniqueUrlGenerator();
                    console.log(NEW);
                    newUrl = new Url({
                        url: req.body.urlInput,
                        alias: NEW.next().value
                    });
                    console.log('new url without alias')
                }
                await newUrl.save();
                mongoose.disconnect();
                res.redirect('/');
            } else {
                console.log("old url");
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
            let oldUrl;
            if(alias){ 
                oldUrl = await Url.findOne({url : req.body.urlInput })
                oldUrl.alias = `localhoset:3000/${req.body.aliasInput}`
            }else { 
                const NEW = uniqueUrlGenerator();
                oldUrl = await Url.findOne({url : req.body.urlInput })
                oldUrl.alias = NEW.next().value;
            }
            console.log(oldUrl);
            await oldUrl.save();
            mongoose.disconnect();
            res.redirect('/');
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
}


module.exports = router;
// if there is an alias input => convert it into link 
// if not => make a link 
