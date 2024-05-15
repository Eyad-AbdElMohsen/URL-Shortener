const {DB_URL , userSchema , Url} = require('../models/db');
const mongoose = require('mongoose');
const router = require('express').Router();

let foundAlias;
let foundUrl;

router.use('/',
    urlValidation,
    urlFromURL,
    urlFromAlias
);
async function urlValidation(req, res, next){
    const findUrl = `localhost:3000${req.url}`;
    await mongoose.connect(DB_URL);
    foundUrl = await Url.findOne({url : findUrl })
    foundAlias = await Url.findOne({alias : findUrl })
    console.log(foundUrl , " " , foundAlias);
    if(foundUrl || foundAlias){
        next();
    }
    else{
        res.status(500).send("Invalid Url ,pls go back and try a valid url")
    }
    mongoose.disconnect();
}
async function urlFromURL(req, res, next){
    if(foundUrl){
        res.redirect(`/${foundUrl.url}`);
    }
    else{
        next();
    }
}
async function urlFromAlias(req, res, next){
    console.log('ok')
    res.redirect(`/${foundAlias.url}`);
}


module.exports = router