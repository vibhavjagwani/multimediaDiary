//server.js
'use strict'

//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
//and create our instances
var app = express();
var router = express.Router();
var Post = require('./model/posts');
var User = require('./model/users');
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://vjagwani:password@ds123896.mlab.com:23896/notebook');
//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});
//adding the /posts route to our /api router
router.route('/posts')
 //retrieve all comments from the database
 .get(function(req, res) {
 //looks at our Post Schema
 Post.find(function(err, posts) {
 if (err)
 res.send(err);
 //responds with a json object of our database comments.
 res.json(posts)
 });
 })
 //post new post to the database
 .post(function(req, res) {
 var post = new Post();
 //body parser lets us use the req.body
 post.author = req.body.author;
 post.post = req.body.post;
 post.title = req.body.title;
 post.time = req.body.time;
 post.key = req.body.key;
post.save(function(err) {
 if (err)
res.send(err);
res.json({ message: 'Post successfully added!' });
	 });
 });

//Use our router configuration when we call /api
//...
app.use('/api', router);
//starts the server and listens for requests
app.listen(port, function() {
 console.log('api running on port ' + port);
});