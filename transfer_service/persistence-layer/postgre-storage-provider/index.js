const StorageProvider = require('../storage-provider');
const { Pool } = require('pg');

let pool = null,
    client = null,
    connectionInitialized = false,
    User,
    Subscription,
    TxIngestionCursor,
    Notification;

function toObjectId(id) {
    if (typeof id === 'string') {
        id = new ObjectId(id);
    }
    return id;
}

//init connection
async function connect(config) {
    console.log('connect !!!');
     pool = new Pool({
        database: config.database,
        host:     config.host,
        port:     config.post,
        user:     config.user,
        password: config.password
    });    
    
    console.log(pool);

    pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    });

    client = await pool.connect();
    try {
        const res = await client.query('SELECT * FROM transaction_states limit 1')
        console.log(res.rows[0]);
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release()
    }
    if (connectionInitialized) return;
    connectionInitialized = true;
    //init models
    //TODO
}

class PostgreStorageProvider extends StorageProvider {
    constructor(config) {
        super();
        connect(config).catch(e => console.log(e.stack));
    }

    async fetchSubscriptions() {
        console.log('provider.fetchSubscriptions ==>');
        const client = await pool.connect();
        try {
            const res = await client.query('SELECT * FROM transaction_states');
            console.log(res.rows);
            return Promise.resolve(res.rows);
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
        }
    }

    fetchSubscription(id) {
        //TODO
    }

    fetchNextNotification(subscriptionId) {
        //TODO
    }

    createNotifications(notifications) {
        //TODO
    }

    removeNotification(notification) {
        //TODO
    }

    markAsProcessed(notification, subscription) {
        //TODO
    }

    saveSubscription(subscription) {
        //TODO
    }

    createDefaultAdminUser(adminAuthenticationToken) {
        let admin = null;
        if (!admin) {
            admin = {admin: true}
        }
        admin.authToken = adminAuthenticationToken

        return Promise.resolve(admin)
    }

    getUserByAuthToken(authToken) {
        //TODO
    }

    updateLastIngestedTx(ingestedTxSequence) {
        //TODO
    }

    getLastIngestedTx() {
        //TODO
    }
}

module.exports = PostgreStorageProvider;