var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var jwt = require('jsonwebtoken');
var pg = require('pg.js');
var _ = require('lodash');
var cardApiMiddleware = require('./carddb-middleware/');
var constants = require('./constants');

app.use('/', express.static(__dirname + '/../client'));
app.use(bodyParser.json());

// card API
app.use('/card-api/', cardApiMiddleware);

app.post('/login', function (req, res) {
  // TODO: mongoose integration
  console.log(req.body);
  var profile = {
    name: 'foouser',
    id: req.body.id
  };


  var token = jwt.sign(profile, constants.jwt_secret, {expiresInMinutes: 60*5});
  res.json({token:token});
});


app.listen(config.staticPort);
console.log('http server listening on port: ', config.staticPort);



module.exports = app;
