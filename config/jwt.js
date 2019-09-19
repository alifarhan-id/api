const jwt = require('jsonwebtoken')

module.exports.ensureToken = function (req, res, next) {

    const a = req.headers['authorization'];
    if (typeof a !== 'undefined') {
        const ali = a.split(' ');
        const b = ali[1];
        req.token = b;

        next();
    } else {
        res.sendStatus(403)
    }
}