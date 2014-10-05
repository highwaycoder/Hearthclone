var when = require('when');
var $ = require('jquery');
var Handlebars = require('hbsfy/runtime');
var _ = require('lodash');
var minionCollectionView = function ($containerElement) {
  var minionTemplate = require('../../templates/minion_table.hbs'),
      newMinionTemplate = require('../../templates/minion_new.hbs'),
      minionEntryTemplate = require('../../templates/minion_entry.hbs');
  Handlebars.registerPartial('minion_entry', minionEntryTemplate);
  Handlebars.registerPartial('minion_new', newMinionTemplate);
  return when.promise(function renderEverything(resolve, reject) {
    $.get('/card-db/api/minions/', function (apiResponse) {
      var minionList = apiResponse.minions,
          minionTypes = apiResponse.minionTypes;
      $containerElement.html(minionTemplate({entries: minionList.rows, types: minionTypes.rows}));
      $('.edit').on('click', function (e) {
        var minionId = $(e.currentTarget).data('id');
        var minion = _.find(minionList.rows, function(minion) {
          return minion.id === minionId;
        });
        console.log(minion);
        e.preventDefault();
      });
      $('.delete').on('click', function (e) {
        $.ajax({
          method: 'DELETE',
          url: '/card-db/api/minions/' + $(e.currentTarget).data('id'),
          success: function (result) {
            renderEverything();
          }
        });
        e.preventDefault();
      });
      var $minionForm = $('form.newMinion');
      $minionForm.on('submit', function (e) {
        function mapize(prev, cur) {
          prev[cur.name] = cur.value;
          return prev;
        }
        var formData = $minionForm.serializeArray().reduce(mapize, {});
        $.ajax({
          method: 'POST',
          url: '/card-db/api/minions',
          data: JSON.stringify(formData),
          success: function (result) {
            renderEverything();
          },
          contentType: 'application/json'
        });
        e.preventDefault();
      });
    });
  });
}
module.exports = minionCollectionView;
