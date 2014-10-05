var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var jwt = require('jsonwebtoken');
var pg = require('pg.js');
var _ = require('lodash');

pg.connect("postgres://hearthclone:hearthclone@localhost/hearthclone", function (err, client, done) {
  if(err) {
    console.log('connect error', err);
  } else {
    app.use('/client', express.static(__dirname + '/../client'));
    app.use('/card-db', express.static(__dirname + '/../card-db'));
    app.use(bodyParser.json());

    app.get('/card-db/api/minions', function (req, res) {
      client.query('SELECT * FROM minions LEFT JOIN minion_types ON (minions.type = minion_types.minion_type_id)', function (err, minions) {
        if(err) {
          console.log('query error', err);
          res.send(500, err);
        } else {
          client.query('SELECT * FROM minion_types ORDER BY minion_type_id', function (err, minionTypes) {
            if(err) {
              console.log('query error', err);
              res.send(500, err);
            } else {
              res.send({
                minions: minions,
                minionTypes: minionTypes
              });
            }
          });
        }
      });
    });

    app.post('/card-db/api/minions', function (req, res) {
      client.query({
        text: 'INSERT INTO minions (name, cost, health, attack, type) VALUES($1, $2, $3, $4, $5)',
        values: _.values(req.body)
      }, function (err) {
        if(err) {
          console.log('query error:', err);
          res.send(500, err)
        } else {
          res.send(200, true);
        }
      });
    });

    app.delete('/card-db/api/minions/:minion_id', function (req,res) {
      client.query({
        text: 'DELETE FROM minions WHERE id = $1',
        values: [req.params['minion_id']]
      }, function (err) {
        if(err) {
          console.log('query error:', err);
          res.send(500, err)
        } else {
          res.send(200, true);
        }
      });
    });

    app.post('/login', function (req, res) {
      // TODO: mongoose integration
      console.log(req.body);
      var profile = {
        name: 'foouser',
        id: req.body['id']
      };


      var token = jwt.sign(profile, 'secret', {expiresInMinutes: 60*5});
      res.json({token:token});
    })

    app.listen(config.staticPort);
    console.log('http server listening on port: ', config.staticPort);

  }

});


module.exports = app;
