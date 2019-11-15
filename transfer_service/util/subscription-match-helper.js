const {parseAsset, assetsEqual} = require('./asset-helper')

/**
 * Check if an operation matches the subscription filtering conditions.
 * @param {Object} subscription - subscription
 * @param {Object} operation - operation to test
 * @returns {Boolean}
 */
function matches(subscription, operation) {
    console.log("operation: \n");
    console.log(operation);
    console.log("\n\n call matches func ===>\n\n");
    console.log("case 1");
    console.log(operation.account !== subscription.account);
    console.log("case 2");
    console.log(operation.destination !== subscription.account);
    // if (subscription.memo && operation.memo != subscription.memo) return false //intended type casting
    // if (subscription.operation_types && subscription.operation_types.length && !subscription.operation_types.includes(operation.type_i)) return false
    if (subscription.account && operation.account !== subscription.account && operation.destination !== subscription.account) return false
    console.log(subscription);
    console.log(operation);
    console.log(operation.transaction_details.memo.value.toString('ascii'));
    // console.log(JSON.parse(operation.transaction_details.memo));
    //TODO store operation.transaction_details 

    // if (subscription.asset_type) {
    //     const assetToFilter = parseAsset(this)
    //     return assetsEqual(assetToFilter, parseAsset(operation)) || assetsEqual(assetToFilter, parseAsset(operation, 'counter_'))
    // }
    return true
}

module.exports = {
    matches
}