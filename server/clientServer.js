var express = require('express');
var app = express();
var config = require('./config');

app.use(express.static(__dirname + '/../client'));

app.listen(config.staticPort);