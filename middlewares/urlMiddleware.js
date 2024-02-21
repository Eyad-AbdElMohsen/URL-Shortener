const validUrl = require('valid-url');

const validateUrlInput = (req, res, next) => {
    const { originalUrl, alias } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ message: 'Original URL is required' });
    }
    if(!alias) {
        req.body.alias = Math.random().toString(36).substring(7);
    }
    if (!validUrl.isUri(originalUrl)) {
        return res.status(400).json({ message: 'Invalid original URL' });
    }
    req.validatedData = { originalUrl, alias };
    next();
};

module.exports = {
    validateUrlInput,
};
