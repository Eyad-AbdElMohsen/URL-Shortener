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
    const findAlias = `localhost:3000${req.url}`;
    const findUrl = `${req.url}`;
    await mongoose.connect(DB_URL);
    foundUrl = await Url.findOne({url : findUrl })
    foundAlias = await Url.findOne({alias : findAlias })
    console.log(foundUrl , " " , foundAlias);
    if(foundUrl || foundAlias){
        next();
    }
    else{
        res.status(500).send("Invalid Url ,pls go back and try a valid url")
    }
    mongoose.disconnect();
}
function urlFromURL(req, res, next){
    if(foundUrl){
        console.log('found url')
        res.redirect(`${req.url}`);
    }
    else{
        next();
    }
}
function urlFromAlias(req, res, next){
    console.log('found alias')
    res.redirect(`${foundAlias.url}`);
}


module.exports = router