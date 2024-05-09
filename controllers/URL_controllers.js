const URL = require('../models/URL_Model');


/* GET home page. */
const get_home = (req, res) => {
    URL.find()
        .then((links) => {
            res.render('index', { title: 'Express', links });
        })
        .catch((err) => {
            res.render('error', { error: "Failed to load home page" })
        })

}


/* Save the data coming from the form in the Database */
const post_data = (req, res) => {

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
}


/* Redirecting the user when clicking the short link */
const get_redirect = (req, res) => {
    const alias = req.params.alias
    URL.findOne({ alias })
        .then((link) => {
            console.log(link)
            if (link) {
                res.redirect(`${link.long}`)
            } else {
                res.render('error', { error: "Invalid alias" })
            }
        })
        .catch((err) => {
            res.render('error', { error: "Failed to redirect" })
        })
}


/* Deleting URL from Database */
const delete_link = (req, res) => {
    const alias = req.body.alias
    URL.deleteOne({ alias })
        .then(() => {
            res.status(200).json("Done")
        })
        .catch((err) => {
            console.log(err)
            res.render('error', { error: "Failed to delete the item" })
        })
}

module.exports = { get_home, post_data }