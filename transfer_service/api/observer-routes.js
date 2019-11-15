const checkAuth = require('./authorization-handler'),
    pkgInfo = require('../package'),
    observer = require('../logic/observer'),
    moment = require('moment-timezone')

function processResponse(promiseOrData, res) {
    if (!(promiseOrData instanceof Promise)) promiseOrData = Promise.resolve(promiseOrData)
    promiseOrData
        .then(data => {
            if (!data) return res.status(200).end()
            res.json(data)
        })
        .catch(e => {
            if (typeof e === 'object' || (e instanceof Error && e.status)) {
                return res.status(e.status || 400)
                    .json({
                        error: e.error || e.message,
                        details: e.details
                    })
            }
            console.error(e)
            res.status(500).end()
        })
}

const started = new Date()

module.exports = function (app) {
    //get application status
    app.get('/api/status', (req, res) => res.json({
        version: pkgInfo.version,
        uptime: moment.duration(new Date() - started, 'milliseconds').format()
    }))

    //get all subscriptions for current user
    app.get('/api/subscription', checkAuth, (req, res) => {
        observer.getActiveSubscriptions().then(() => {
            res.end("not implement yet!!");
        })
    })

    app.get('/api/getSubscription/:id', (req, res)  => {
        let {id} = req.params;
        observer.getSubscription(id).then((books) => {
            // res.end(books);
            res.end(JSON.stringify(books));
        });
    });
}