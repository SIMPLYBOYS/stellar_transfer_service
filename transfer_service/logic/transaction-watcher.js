const {horizon} = require('./stellar-connector'),
    {parseTransaction} = require('./stream-processor'),
    {matches} = require('../util/subscription-match-helper'),
    storage = require('./storage')

/**
 * Tracks transactions using event streaming from Horizon server
 */
class TransactionWatcher {
    constructor(observer) {
        this.queue = []
        this.processing = false
        this.observer = observer
    }

    /**
     * Add transactions to the processing queue
     * @param {Array<Transaction>}transactions
     */
    enqueue(transactions) {
        console.log("not implement yet !!");
    }

    /**
     * Pick the entry from the queue and process it
     */
    processQueue() {
        // TODO
    }

    /**
     * Start watching
     */
    watch() {
        // TODO
    }

    /**
     * Fast-forward transaction tracking from the last known tx
     */
    trackTransactions() {
        // TODO
    }

    /**
     * Track live transactions stream from the Horizon server
     */
    trackLiveStream() {
        //subscribe to transactions live stream
        //TODO
    }

    /**
     * Terminates watching stream
     */
    stopWatching() {
        // TODO
    }
}

module.exports = TransactionWatcher