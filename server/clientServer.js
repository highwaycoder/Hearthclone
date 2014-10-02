var express = require('express');
var app = express();
var config = require('./config');
var jwt = require('jsonwebtoken');

app.use(express.static(__dirname + '/../client'));

app.post('/login', function (req, res) {
  // TODO: mongoose integration
  var profile = {
    name: 'foouser',
    id: 123
  };


  var token = jwt.sign(profile, 'secret', {expiresInMinutes: 60*5});
  res.json({token:token});
})

app.listen(config.staticPort);

module.exports = app;
