var friendlyMap = {
  "hellscream": "Garrosh Hellscream"
};

module.exports = function (name) {
  return friendlyMap[name] || "Unknown Hero ("+name+")";
}
