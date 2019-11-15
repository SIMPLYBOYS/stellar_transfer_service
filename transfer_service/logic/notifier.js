class Notifier {
    constructor(observer) {
        this.observer = observer
        this.inProgress = new Set()
    }

    startNewNotifierThread() {
        console.log('startNewNotifierThread ===>');
        //TODO
    }

    getSubscriptionToProcess() {
        //TODO
    }

    runSubscriptionNotifierThread(subscription) {
        //TODO
    }

    getNextNotification(subscription) {
        //TODO
    }

    createNotifications(notifications) {
        //TODO
    }

    markAsProcessed(notification, subscription) {
        //TODO
    }

    handleProcessingError(err, notification, subscription) {
        //TODO
    }

    sendNotification(notification, subscription) {
        //TODO send mail or notification
    }
}

module.exports = Notifier