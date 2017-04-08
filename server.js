var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var LocalStrategy = require('passport-local');

var PORT = process.env.PORT || 3000;
var dbURI = 'mongodb://localhhost:27017/rent';


var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
mongo.connect(dbURI, function(err, data){
  if(err){
    console.log(err);
  }
  console.log('Connected to mongodb');

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser( (id, done) => {
    db.collection('users').findOne(
      {_id: new ObjectID(id)},
      (err, doc) => {
        done(null, doc);
      }
    );
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.collection('users').findOne({ username: username }, function (err, user) {
        console.log('User '+ username +' attempted to log in.');
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (password !== user.password) { return done(null, false); }
        return done(null, user);
      });
    }
  ));

  //Middleware
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
  };

  app.route('/login')
    .post(passport.authenticate('local', { failureRedirect: '/' }),(req,res) => {
      res.redirect('/profile');
    });

  app.route('/profile')
    .get(ensureAuthenticated, (req,res) => {
      res.render(process.cwd() + '/views/profile');
    });

  app.route('/logout')
    .get((req, res) => {
        req.logout();
        res.redirect('/');
    });

  app.use((req, res, next) => {
    res.status(404)
      .type('text')
      .send('Not Found');
  });

  app.route('/register')
  .post((req, res, next) => {
      db.collection('users').findOne({ username: req.body.username }, function (err, user) {
          if(err) {
              next(err);
          } else if (user) {
              res.redirect('/');
          } else {
              db.collection('users').insertOne(
                {username: req.body.username,
                 password: req.body.password},
                (err, doc) => {
                    if(err) {
                        res.redirect('/');
                    } else {
                        next(null, user);
                    }
                }
              )
          }
      })},
    passport.authenticate('local', { failureRedirect: '/' }),
    (req, res, next) => {
        res.redirect('/profile');
    }
);

//API
//METHODS

//Get posts
//Sort by location
app.get('/api/find', function(req, res){
  var posts = db.collection('posts');
  var search = {};
  if(req.query.title){
    search.title = req.query.title;
  }
  posts.find(search).toArray(function(err, docs) {
    if(err){
      console.log(err);
    }
    res.json(docs);
  });
  //res.json({"posts":[{image_url:'',log:0,lat:0,title:"example",rented:false}]});
});

//Make offer to post
app.post('/api/offer', function(req, res){
  console.log(req);
});

//Add posts
app.post('/api/add', function(req, res){
  var posts = db.collection('posts');

  console.log(req);
});

//Edit/Update posts



  db = data;
  //Start listening
  app.listen(PORT, function(){
    console.log('Listening on port', PORT);
  });
});
