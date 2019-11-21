const errors = require('../util/errors'),
    TransactionWatcher = require('./transaction-watcher'),
    Notifier = require('./notifier'),
    storage = require('./storage'),
    config = require('../models/config');

/**
 *
 */
class Observer {
    constructor() {
        this.notifier = new Notifier(this)
        this.transactionWatcher = new TransactionWatcher(this)
        this.observing = false
    }

    loadSubscriptions() {
        //return subscriptions if they were fetched already
        if (this.subscriptions) return Promise.resolve(this.subscriptions)
        // return the loading promise if the loading is already in progress
        if (this.__loadingSubscriptionPromise) return this.__loadingSubscriptionPromise
        //load only active subscriptions
        this.__loadingSubscriptionPromise = storage.fetchSubscriptions()
            .then(fetched => {
                console.log('fetched: ' + fetched);
                this.subscriptions = fetched || []
                return this.subscriptions
            })
        return this.__loadingSubscriptionPromise
    }

    getActiveSubscriptionsCount() {
        return this.subscriptions.length
    }

    subscribe(subscriptionParams, user) {
        console.log('subscribe: ');
        console.log(subscriptionParams);
        //TODO: prevent duplicate subscriptions by checking subscription hash (fields "account", "asset_type" etc.)
        //https://www.npmjs.com/package/farmhash
        return this.loadSubscriptions()
            .then(() => {
                console.log("1106");
                if (this.getActiveSubscriptionsCount() >= config.maxActiveSubscriptions) {
                    console.log('execute error !!');    
                    return Promise.reject(errors.forbidden('Max active subscriptions exceeded.'))
                }
                return storage.createSubscription(subscriptionParams, user)
            })
            .then(newSubscription => {
                console.log('1106 push subscription ==>');
                console.log(newSubscription);
                this.subscriptions.push(newSubscription)
                return newSubscription
            })
    }

    unsubscribe(subscriptionId) {
        return this.loadSubscriptions()
            .then(() => {
                for (let i = 0; i < this.subscriptions.length; i++) {
                    let s = this.subscriptions[i]
                    //match subscription by id
                    if (s.id == subscriptionId) { //intended non-strict comparision
                        s.status = 1
                        this.subscriptions.splice(i, 1)
                        return s.save()
                    }
                }

                return Promise.reject(errors.notFound())
            })
    }

    getActiveSubscriptions() {
        return this.loadSubscriptions()
            .then(subscriptions => { 
                console.log('subscriptions: ');
                console.log(subscriptions);
                subscriptions.slice(0);
            }) //copy array with subscriptions
    }

    getSubscription(subscriptionId) {
        return this.loadSubscriptions()
            .then(() => {
                let subscription = this.subscriptions.find(s => s.id == subscriptionId)
                if (subscription) return subscription
                //try to load the subscription from db (it may be disabled or expired)
                return storage.fetchSubscription(subscriptionId)
            })
    }

    start() {
        if (this.observing) throw new Error('Observer has been started already.')
        this.observing = true
        this.transactionWatcher.watch()
        this.loadSubscriptions()
            .then(() => this.notifier.startNewNotifierThread())
    }

    stop() {
        this.observing = false
        this.transactionWatcher.stopWatching()
    }
}

module.exports = new Observer()