const URL = require('../models/urlSchema');
const { validateUrlInput } = require('../middlewares/urlMiddleware');

exports.shortenUrl = async (req, res) => {
    const { originalUrl, alias } = req.validatedData;

    try {
        let url;
        if (alias) {
            url = await URL.findOne({ alias });
            if (url) {
                return res.status(400).json({ message: 'Alias already in use' });
            }
        }

        const shortUrl = `http://localhost:3000/${alias}`;
        url = new URL({ originalUrl, shortUrl, alias });
        await url.save();

        res.status(201).json(url);
    } catch (error) {
        return res.status(500).render('error', { message: error.message, error: { status: 500 } });
    }
};

exports.redirectToOriginalUrl = async (req, res) => {
    const shortUrl = req.params.alias;

    try {
        const url = await URL.findOneAndUpdate(
            { alias: shortUrl },
            { $inc: { clickCount: 1 } },
            { new: true }
        );
        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).render('error', { message: 'URL not found', error: { status: 404 } });
        }
    } catch (error) {
        return res.status(500).render('error', { message: error.message, error: { status: 500 } });
    }
};

exports.getUrlStats = async (req, res) => {
    const shortUrl = req.params.alias;

    try {
        const url = await URL.findOne({ alias: shortUrl });
        if (url) {
            res.render('stats', { originalUrl: url.originalUrl, clickCount: url.clickCount });
        } else {
            return res.status(404).render('error', { message: 'URL not found', error: { status: 404 } });
        }
    } catch (error) {
        return res.status(500).render('error', { message: error.message, error: { status: 500 } });
    }
};

exports.getAllUrls = async (req, res) => {
    try {
        const urls = await URL.find();
        res.json(urls);
    } catch (error) {
        return res.status(500).render('error', { message: error.message, error: { status: 500 } });
    }
};