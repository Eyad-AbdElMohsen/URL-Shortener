const router = require('express').Router();
const { validateUrlInput } = require('../middlewares/urlMiddleware');
const urlController = require('../controllers/urlController');



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/shorten', validateUrlInput, urlController.shortenUrl);
router.get('/:alias', urlController.redirectToOriginalUrl);
router.get('/:alias/stats', urlController.getUrlStats);


module.exports = router;
