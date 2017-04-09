var request = require('superagent');
var sparkpostAPIURL = 'https://api.sparkpost.com/api/v1/transmissions';

exports.sendEmail = function(to, subject, text) {
    request.post(sparkpostAPIURL)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'c063c1944d5c83d1fdf0186db38a97b81e3ca5fa')
        .send({
            "options": {
                "sandbox": true
            },
            "content": {
                "from": "sandbox@sparkpostbox.com",
                "subject": subject,
                "text": text
            },
            "recipients": [{
                "address": to
            }]
        })
        .end(function(err, result) {
            return result;
        })
};

exports.purchaseMadeEmail = function(buyer, seller, post, paymentResults, times){
  console.log('****************************************************************');
  console.log("Buyer: " + buyer);
  console.log("Seller: " + seller);
  console.log("Post: " + post);
  console.log("Payment results: " + paymentResults);
}
