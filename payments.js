var request = require('superagent');
var capitalOneLink = 'http://api.reimaginebanking.com/';
var endKey = '?key=' + process.env.CapitalOneKey;

exports.transfer = function(buyer, seller, price, next) {
    console.log('Transfers $' + price + ' from buyer: ' + buyer + ' to seller: ' + seller);
    var transferLink = capitalOneLink + 'accounts/' + buyer + '/transfers' + endKey;
    request.post(transferLink)
        .set('Content-Type', 'application/json')
        .send({
            "medium": "balance",
            "payee_id": seller,
            "amount": price,
            "transaction_date": new Date().toISOString().substring(0, 10),
            "description": "Rental from rentible"
        })
        .end(function(err, result) {
            console.log(result.body);
            if (result.code == 404) {
                console.log(err);
            } else {
                next(result);
            }
        })
};

function createAccount(id, next) {
    var accountLink = capitalOneLink + 'customers/' + id + '/accounts' + endKey;
    console.log(accountLink);
    request.post(accountLink)
        .set('Content-Type', 'application/json')
        .send({
            "type": "Savings",
            "nickname": "rentible",
            "rewards": 1000,
            "balance": 1000
        })
        .end(function(err, result) {
            return next(result);
        })
};


exports.createCustomer = function(first_name, last_name, street_number, street_name,
    city, state, zip, next) {
    var customerLink = capitalOneLink + 'customers' + endKey;
    console.log(customerLink);
    request.post(customerLink)
        .set('Content-Type', 'application/json')
        .send({
            "first_name": first_name,
            "last_name": last_name,
            "address": {
                "street_number": street_number,
                "street_name": street_name,
                "city": city,
                "state": state,
                "zip": zip
            }
        })
        .end(function(err, result) {
            createAccount(result.body.objectCreated._id, function(accountResults) {
                return next(accountResults);
            });
        });
};
