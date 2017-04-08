var request = require('superagent');
var capitalOneLink = 'http://api.reimaginebanking.com/atms?key=' + process.env.CapitalOneKey;

exports.transfer = function(buyer, seller, price) {
    console.log('Transfers $' + price + ' from buyer: ' + buyer + ' to seller: ' + seller);

    request.get(capitalOneLink).end(function(res) {
        foo(res.status);
        bar(res.body); //do something
    });
};
