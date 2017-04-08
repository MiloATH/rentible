var express = require('express');
//var mongo = require('mongodb').MongoClient;

var PORT = process.env.PORT || 3000;
var dbURI = 'mongodb://localhhost:27017/collections';

var app = express();
var db;

//DB Connection
/*mongo.connect(dbURI, function(err, data){
  if(err){
    console.log(err);
  }
  db = data;*/
  //Start listening
  app.listen(PORT, function(){
    console.log('Listening on port', PORT);
  });
//});

//API
//METHODS

//Get posts
//Sort by location
app.get('/api/find', function(req, res){
  //var posts = db.collection('posts');
  res.json({"posts":[{image_url:'',log:0,lat:0,title:"example",rented:false}]});
});

//Make offer to post
app.post('/api/offer', function(req, res){
  console.log(req);
});

//Add posts
app.post('/api/add', function(req, res){
  console.log(req);
});

//Edit/Update posts
