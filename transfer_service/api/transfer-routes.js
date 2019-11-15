function notImplementedError(req, res) {
    res.status(501).json({error: 'Endpoint not implemented !!'});
}

module.exports = function (app) {

    app.post('/deposit', notImplementedError);

    app.post('/withdraw', notImplementedError);

    app.get('/fee', (req, res) => {
        let dummyObj = {
            "fee": 0.013
        };
        res.end(JSON.stringify(dummyObj));
    });

    app.get('/info', (req, res) => {
        let dummyObj = {
            "deposit": {
                "USD": {
                    "enabled": true,
                    "fee_fixed": 5,
                    "fee_percent": 1,
                    "min_amount": 0.1,
                    "max_amount": 1000
                },
                "ETH": {
                    "enabled": true,
                    "fee_fixed": 0.002,
                    "fee_percent": 0
                }
            },
            "withdraw": {
                "USD": {
                    "enabled": true,
                    "authentication_required": true,
                    "fee_minimum": 5,
                    "fee_percent": 0.5,
                    "min_amount": 0.1,
                    "max_amount": 1000
                },
                "ETH": {
                    "enabled": false
                }
            },
            "fee": {
                "enabled": false
            },
            "transactions": {
                "enabled": true
            },
            "transaction": {
                "enabled": false
            }
        };
        res.end(JSON.stringify(dummyObj));
    });

    app.get('/transactions', (req, res) => {
        let dummyObj = {
            "transactions": [{
                    "id": "82fhs729f63dh0v4",
                    "kind": "deposit",
                    "status": "pending_external",
                    "status_eta": 3600,
                    "external_transaction_id": "2dd16cb409513026fbe7defc0c6f826c2d2c65c3da993f747d09bf7dafd31093",
                    "more_info_url": "https://youranchor.com/tx/242523523",
                    "amount_in": "18.34",
                    "amount_out": "18.24",
                    "amount_fee": "0.1",
                    "started_at": "2017-03-20T17:05:32Z"
                },
                {
                    "id": "82fhs729f63dh0v4",
                    "kind": "withdrawal",
                    "status": "completed",
                    "amount_in": "500",
                    "amount_out": "495",
                    "amount_fee": "3",
                    "started_at": "2017-03-20T17:00:02Z",
                    "completed_at": "2017-03-20T17:09:58Z",
                    "more_info_url": "https://youranchor.com/tx/242523523",
                    "stellar_transaction_id": "17a670bc424ff5ce3b386dbfaae9990b66a2a37b4fbe51547e8794962a3f9e6a",
                    "external_transaction_id": "2dd16cb409513026fbe7defc0c6f826c2d2c65c3da993f747d09bf7dafd31093"
                }
            ]
        };
        res.end(JSON.stringify(dummyObj));
    });

    app.get('/transaction/:id', (req, res) => {
        let dummyObj = {
            "transaction": {
                "id": "82fhs729f63dh0v4",
                "kind": "deposit",
                "status": "pending_external",
                "status_eta": 3600,
                "external_transaction_id": "2dd16cb409513026fbe7defc0c6f826c2d2c65c3da993f747d09bf7dafd31093",
                "more_info_url": "https://youranchor.com/tx/242523523",
                "amount_in": "18.34",
                "amount_out": "18.24",
                "amount_fee": "0.1",
                "started_at": "2017-03-20T17:05:32Z"
            }
        };
        res.end(JSON.stringify(dummyObj));
    });
}