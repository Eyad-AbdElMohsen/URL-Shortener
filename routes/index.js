const router = require('express').Router();
const controller = require('../controllers/URL_controllers')


/* GET home page. */
router.get('/', controller.get_home);


/* Save the data coming from the form in the Database */
router.post('/', controller.post_data)

module.exports = router;
