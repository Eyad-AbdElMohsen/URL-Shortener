const router = require('express').Router();
const URL = require('../models/URL_Model');


/* GET home page. */
router.get('/', (req, res) => {
    URL.find()
        .then((links) => {
            res.render('index', { title: 'Express', links });
        })
        .catch((err) => {
            res.render('error', { error: "Failed to load home page" })
        })

});


/* Save the data coming from the form in the Database */
router.post('/', (req, res) => {

    const long = req.body.urlInput
    const alias = req.body.aliasInput
    const url = new URL({ long, alias })
    url.save()
        .then(() => {
            res.redirect('/')
            console.log("Link added successfully to the Database.")
        })
        .catch((err) => {
            res.render('error', { error: "Failed to save data to the database" })
        })
})

module.exports = router;
