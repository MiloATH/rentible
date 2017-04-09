var request = require('superagent');
var capitalOneLink = 'http://api.reimaginebanking.com/';
var endKey = '?key=' + process.env.CapitalOneKey;

exports.transfer = function(buyer, seller, price) {
    console.log('Transfers $' + price + ' from buyer: ' + buyer + ' to seller: ' + seller);
    var transferLink = capitalOneLink + 'accounts/' + buyer + '/transfer' + endKey;
    request.post(transferLink)
        .set('Content-Type', 'application/json')
        .send({
            "medium": "balance",
            "payee_id": seller,
            "amount": price,
            "transaction_date": new Date().toISOString().substring(0, 10),
            "description": "Rental from rentible"
        })
        .end(function(res) {
            console.log("Transfer transcript:" + res);
            if (res.status == 404) {
                return {
                    "error": "account(s) not found."
                };
            } else {
                return {
                    "Succes": "no error"
                };
            }
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
        .end(function(err,result) {
            return next(result);
        })
};
