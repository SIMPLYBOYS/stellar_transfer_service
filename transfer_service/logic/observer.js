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
        this.notifier = new Notifier(this);
        this.transactionWatcher = new TransactionWatcher(this);
        this.observing = false;
    }

    loadSubscriptions() {
        return Promise.resolve(storage.fetchSubscriptions());
    }

    getActiveSubscriptionsCount() {
        return this.subscriptions.length;
    }

    subscribe(subscriptionParams, user) {
        //TODO
        return Promise.resolve("");
    }

    unsubscribe(subscriptionId) {
        //TODO
        return Promise.resolve("");
    }

    getActiveSubscriptions() {
       //TODO
       return Promise.resolve("");
    }

    getSubscription(subscriptionId) {
        return this.loadSubscriptions()
            .then((subscriptions) => {
                this.subscriptions = subscriptions;
                let subscription = this.subscriptions.find(s => s.id == subscriptionId);
                if (subscription) return subscription;
                //try to load the subscription from db (it may be disabled or expired)
                return storage.fetchSubscription(subscriptionId);
            });
    }

    start() {
        if (this.observing) throw new Error('Observer has been started already.');
        this.observing = true;
        this.transactionWatcher.watch();
        this.loadSubscriptions()
            .then(() => this.notifier.startNewNotifierThread());
    }

    stop() {
        this.observing = false;
        this.transactionWatcher.stopWatching();
    }
}

module.exports = new Observer();