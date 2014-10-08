var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require('./config');
var pg = require('pg.js');
var _ = require('lodash');

pg.connect("postgres://hearthclone:hearthclone@localhost/hearthclone", function (err, client, done) {
  if(err) {
    console.log('connect error', err);
  } else {

    app.use(express.static(__dirname + '/../'));
    app.use(bodyParser.json());

    app.get('/api/minions', function (req, res) {
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

    app.post('/api/minions', function (req, res) {
      var createParams = function (length) {
        return _.map(_.range(length), function (val) {
          return "$" + (val+1);
        });
      };

      var columns = _.keys(req.body).join(',');
      var params = createParams(_.values(req.body).length);

      client.query({
        text: 'INSERT INTO minions (' + columns + ') VALUES (' + params + ') RETURNING *',
        values: _.values(req.body)
      }, function (err, result) {
        if(err) {
          console.log('query error:', err);
          console.log('columns:', columns);
          console.log('params:', params);
          console.log('values:', _.values(req.body));
          res.send(500, err)
        } else {
          console.log(result.rows[0]);
          res.send(200, result.rows[0]);
        }
      });
    });

    app.put('/api/minions/:minion_id', function (req,res) {
      var field_definitions = _.map(req.body, function (val, key) {
        if (typeof val === "string") {
          val = "'" + val + "'";
        }
        return key + " = " + val;
      }).join(',');
      console.log("Update request", field_definitions);
      client.query({
        text: 'UPDATE minions SET ' + field_definitions + ' WHERE id=$1',
        values: [req.body.id]
      }, function (err, result) {
        if(err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          client.query('SELECT * FROM minions LEFT JOIN minion_types ON (minions.type = minion_types.minion_type_id)', function (err, minion) {
            if(err) {
              console.log('query error', err);
              res.send(500, err);
            } else {
              res.status(200).send(minion);
            }
          });
        }
      });
    });

    app.delete('/api/minions/:minion_id', function (req,res) {
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

    app.listen(config.listenPort);
    console.log('card db backend listening on port', config.listenPort);
  }

});
