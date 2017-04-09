var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var LocalStrategy = require('passport-local');
var path = require('path');



var PORT = process.env.PORT || 3000;
var dbURI = process.env.MONGOLAB_URI || require('./envVars.js').MLAB || 'mongodb://localhhost:27017/rent';

var payments = require('./payments.js');
var emails = require('./emails.js');


var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'HideSecretsInPlainSight',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

//METHODS for internal use
function findUserByID(id, next) {
    var ret = {};
    var users = db.collection('users');
    users.findOne({
        _id: ObjectID(id)
    }, function(err, user) {
        if (err) {
            ret.error = "id not found";
            console.log(err);
        } else {
            console.log(user);
            ret = user;
        }
        next(ret);
    });
}

function find(req, res, next) {
    var posts = db.collection('posts');
    var search = {};
    if (req.query.title) {
        search.title = req.query.title;
    }

    if (req.query.dis && req.query.log && req.query.lat) {
        var distance = +req.query.dis;
        var longitude = +req.query.log;
        var latitude = +req.query.lat;
        var milesToRadian = function(miles) {
            var earthRadiusInMiles = 3959;
            return miles / earthRadiusInMiles;
        };
        search.loc = {
            $geoWithin: {
                $centerSphere: [
                    [longitude, latitude], milesToRadian(distance)
                ]
            }
        };
    }

    posts.find(search).toArray(function(err, docs) {
        if (err) {
            console.log(err);
        }
        next(docs);
    });
};

//DB Connection
mongo.connect(dbURI, function(err, data) {
    if (err) {
        console.log(err);
    }
    console.log('Connected to mongodb');

    db = data;
    db.collection('posts').ensureIndex({
        loc: "2dsphere"
    });

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        db.collection('users').findOne({
                _id: new ObjectID(id)
            },
            (err, doc) => {
                done(null, doc);
            }
        );
    });

    //Middleware
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/'); //NOTE:SHOULD THIS BE /login
    };

    passport.use(new LocalStrategy(
        function(username, password, done) {
            db.collection('users').findOne({
                username: username
            }, function(err, user) {
                console.log('User ' + username + ' attempted to log in.');
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (password !== user.password) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

    app.route('/signup')
        .get((req, res) => {
            res.render('signupPage', {
                title: 'Rentible'
            });
        })
        .post((req, res, next) => {
                console.log("Trying to signup");
                if (req.body.username && req.body.password && req.body.email) {
                    db.collection('users').findOne({
                        username: req.body.username
                    }, function(err, user) {
                        if (err) {
                            next(err);
                        } else if (user) {
                            res.redirect('/');
                        } else {
                            var first_name = req.body.first_name || req.body.username;
                            var last_name = req.body.last_name || 'none';
                            console.log("first name is " + first_name);
                            payments.createCustomer(first_name,
                                last_name,
                                req.body.street_number || '1',
                                req.body.street_name || 'none',
                                req.body.city || 'McLean',
                                req.body.state || 'VA',
                                req.body.zip || '22102',
                                function(result) {
                                    console.log('results of capital one ' + result);

                                    db.collection('users').insertOne({
                                            username: req.body.username,
                                            password: req.body.password,
                                            capitalOneCustomerID: result.body.objectCreated._id,
                                            email: req.body.email
                                        },
                                        (err, doc) => {
                                            if (err) {
                                                res.redirect('/');
                                            } else {
                                                next(null, user);
                                            }
                                        }
                                    )

                                });

                        }
                    })
                } else {
                    res.json({
                        "error": "Invalid input. Need email, username, and password"
                    })
                }
            },
            passport.authenticate('local', {
                failureRedirect: '/'
            }),
            (req, res, next) => {
                console.log('logged in');
                res.redirect('/profile');
            }
        );



    app.route('/login')
        .get((req, res) => {
            res.render('loginPage', {
                title: 'Rentible'
            });
        })
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/profile');
        });

    app.route('/profile')
        .get(ensureAuthenticated, (req, res) => {
            res.redirect('/');
            res.end();
            //res.render(process.cwd() + '/views/profile');
        });

    app.route('/logout')
        .get((req, res) => {
            req.logout();
            res.redirect('/');
        });




    app.get('/', function(req, res) {
        var login = false;
        if (req.user) {
            login = true;
        }
        find(req, res, function(result) {
            res.render('index', {
                title: 'Rentible',
                data: result,
                isLogin: login
            });
        });
    });

    app.get('/item/:id', function(req, res) {
        var id = req.params.id;
        var posts = db.collection('posts');
        posts.findOne({
            _id: ObjectID(id)
        }, function(err, result) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            posts.find({}).toArray(function(err, docs) {
                res.render('itemPage', {
                    title: 'Rentible',
                    datum: result,
                    similarData1: docs[0],
                    similarData2: docs[1],
                    similarData3: docs[2]
                });
            });
        });
    });

    //API
    //METHODS

    //Get posts
    //Sort by location
    app.get('/api/find', function(req, res) {
        find(req, res, function(results) {
            res.json(results);
        });
    });

    //Make offer to post
    app.post('/api/offer', ensureAuthenticated, function(req, res) {
        var posts = db.collection('posts');

        var id = req.body.id; //id of post (_id)
        var times = req.body.times || 1; //Number of times for the rental
        if (id && times) {
            //console.log("ObjectId is " + ObjectID));
            posts.find({
                "_id": ObjectID(id)
            }).toArray(function(err, docs) {
                if (err) {
                    console.log(err);
                    res.json({
                        "error": "Invalid id in db. The item you are buying doesn't exist."
                    });
                } else if (docs.length != 1) {
                    var docsError = "Invalid id in db. The number of items with that id is " + docs.length;
                    res.json({
                        "error": docsError
                    });
                } else {
                    //Rent item
                    //Make payment
                    var item = docs[0];
                    console.log("Buyer: " + req.session.passport.user);
                    console.log(item);
                    console.log("Seller: " + item.ownerId);
                    if (req.session.passport.user && item.ownerId) {
                        var buyerID = req.session.passport.user;
                        var sellerId = item.ownerId;
                        findUserByID(buyerID, function(buyer) {
                            findUserByID(sellerId, function(seller) {
                                console.log(buyer);
                                console.log(seller);
                                if (buyer.capitalOneCustomerID && seller.capitalOneCustomerID) {
                                    payments.transfer(buyer.capitalOneCustomerID, seller.capitalOneCustomerID, item.price * times, function(result) {
                                        emails.purchaseMadeEmail(buyer, seller, item, result, times);
                                        res.redirect('/');
                                    });
                                }
                            })
                        });
                    } else {
                        res.json({
                            "error": "Invalid buyer or seller _id."
                        })
                    }
                }
            })
        } else {
            res.json({
                "error": "Invalid id. The item you are buying doesn't exist or you forgot the number of times you rented."
            });
        }

        console.log(req);
    });


    //Add posts
    app.post('/api/add', ensureAuthenticated, function(req, res) {
        console.log('Adding post');
        var posts = db.collection('posts');

        var image_url = req.body.image_url;
        var title = req.body.title;
        var description = req.body.description;
        var log = +req.body.log; //Longitude
        var lat = +req.body.lat; //Latitude
        var ownerId = req.session.passport.user; //Owner's username NOTE:could be problem with multiple people having the same username
        var price = req.body.price; //Price
        var perTime = (req.body.perTime || '').toLowerCase(); //The unit for cost per time

        posts.insert({
            image_url: image_url,
            title: title,
            description: description,
            loc: {
                type: "Point",
                coordinates: [log, lat]
            },
            ownerId: ownerId,
            price: price,
            perTime: perTime
        }, function(err, result) {
            if (err) {
                console.log(err);
                res.json({
                    "error": err
                });
            } else {
                console.log("Added: " + title);
            }
        });
        res.end();
    });



    //Edit/Update posts



    //Testing
    app.get('/test', function(req, res) {
        var file = path.join(__dirname, 'views/formtest.html');
        console.log(file);
        res.sendFile(file, function(err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            }
        });
    });


    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found');
    });

    //Start listening
    app.listen(PORT, function() {
        console.log('Listening on port', PORT);
    });
});
