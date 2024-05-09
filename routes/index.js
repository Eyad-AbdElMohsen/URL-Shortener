const router = require('express').Router();
const controller = require('../controllers/URL_controllers')

/* GET home page. */
router.get('/', controller.get_home);


/* Save the data coming from the form in the Database */
router.post('/', controller.post_data)


/* Redirecting the user when clicking the short link */
router.get('/:alias', controller.get_redirect)


/* Deleting URL from Database */
router.delete('/', controller.delete_link)


module.exports = router;
