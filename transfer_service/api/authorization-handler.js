const config = require('../models/config');

function checkAuth(req, res, next) {
    console.log('checkAuth ===>');
    console.log(req.body);
    if (!config.authorization || config.authorization === 'disabled') {
        //anonymous user
        req.user = {
            id: 1,
            email: 'anonymous',
            admin: true,
            wallet: 'GAS3FWVXSKQ7G6SXSEQQKVCHMZOOSFIRCQNFT5L3WE3MGLQ6SVFZPZXX'
        }
        return next()
    }

    // TODO JWT Check
}

module.exports = checkAuth