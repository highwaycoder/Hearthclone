var when = require('when');
var $ = require('jquery');
module.exports = function(initState) {
  var promise = when.promise(function (resolve, reject) {
    var loginTemplate = require('../../templates/login.hbs'),
        $formEl;
    initState.$el.append(loginTemplate());
    $formEl = $('form.login');
    $formEl.on('submit', function (e) {
      function mapize(prev, cur) {
        prev[cur.name] = cur.value;
        return prev;
      }
      var formData = $formEl.serializeArray().reduce(mapize, {});
      $.ajax({
        method: 'POST',
        url: '/login',
        data: JSON.stringify(formData),
        success: function (result) {
          resolve(result);
        },
        contentType: 'application/json'
      });
      console.log('form submitted');
      e.preventDefault();
    });
  });
  return promise;
}
