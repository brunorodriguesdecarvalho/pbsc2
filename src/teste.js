var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
 
var app = express();
var numExpectedSources = 2;
var store = new MongoDBStore(
  {
    uri: 'mongodb://bad.host:27000/connect_mongodb_session_test?connectTimeoutMS=10',
    databaseName: 'connect_mongodb_session_test',
    collection: 'mySessions'
  },
  function(error) {
    // Should have gotten an error
  });
 
store.on('error', function(error) {
  // Also get an error here
});
 
app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
}));
 
app.get('/', function(req, res) {
  res.send('Hello ' + JSON.stringify(req.session.secret));
});
 
server = app.listen(3000);