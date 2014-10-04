var Set = function () {
  this.elements = {};
}

Set.prototype.elements = null;

Set.prototype.add = function (element) {
  this.elements[element] = element;
}

Set.prototype.has = function (element) {
  return this.elements[element] !== undefined;
}

Set.prototype.remove = function (element) {
  this.elements[element] = undefined;
}

module.exports = Set;
