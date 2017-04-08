var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var LocalStrategy = require('passport-local');
var path = require('path');

var PORT = process.env.PORT || 3000;
var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhhost:27017/rent';

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(session({
    secret: process.env.SESSION_SECRET || 'HideSecretsInPlainSight',
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


//DB Connection
mongo.connect(dbURI, function(err, data) {
    if (err) {
        console.log(err);
    }
    console.log('Connected to mongodb');

    db = data;

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


    app.route('/register')
        .post((req, res, next) => {
                console.log("Trying to register");
                db.collection('users').findOne({
                    username: req.body.username
                }, function(err, user) {
                    if (err) {
                        next(err);
                    } else if (user) {
                        res.redirect('/');
                    } else {
                        db.collection('users').insertOne({
                                username: req.body.username,
                                password: req.body.password
                            },
                            (err, doc) => {
                                if (err) {
                                    res.redirect('/');
                                } else {
                                    next(null, user);
                                }
                            }
                        )
                    }
                })
            },
            passport.authenticate('local', {
                failureRedirect: '/'
            }),
            (req, res, next) => {
                res.redirect('/profile');
            }
        );

    app.route('/login')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), (req, res) => {
            res.redirect('/profile');
        });

    app.route('/profile')
        .get(ensureAuthenticated, (req, res) => {
            res.render(process.cwd() + '/views/profile');
        });

    app.route('/logout')
        .get((req, res) => {
            req.logout();
            res.redirect('/');
        });




    //API
    //METHODS

    //Get posts
    //Sort by location
    app.get('/api/find', function(req, res) {
        var posts = db.collection('posts');
        var search = {};
        if (req.query.title) {
            search.title = req.query.title;
        }
        posts.find(search).toArray(function(err, docs) {
            if (err) {
                console.log(err);
            }
            res.json(docs);
        });
    });

    //Make offer to post
    app.post('/api/offer', ensureAuthenticated, function(req, res) {
        var posts = db.collection('posts');

        var id = req.body.id; //id of post

        console.log(req);
    });


    //Add posts
    app.post('/api/add', ensureAuthenticated, function(req, res) {
        console.log('Adding post');
        var posts = db.collection('posts');

        var image_url = req.body.image_url;
        var title = req.body.title;
        var description = req.body.description;
        var log = req.body.log; //Longitude
        var lat = req.body.lat; //Latitude
        var owner = req.body.owner; //Owner's username NOTE:could be problem with multiple people having the same username
        var price = req.body.price; //Price per day

        posts.insert({
            image_url: image_url,
            title: title,
            description: description,
            log: log,
            lat: lat,
            owner: owner,
            price: price
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
        var file = path.join(__dirname, 'formtest.html');
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
