var $ = require('jquery');
var _ = require("lodash");
$(function() {
	var minionCollectionView = require('./views/MinionCollectionView');
	minionCollectionView($('#card-db'));
});
