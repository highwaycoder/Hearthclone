const DECK_SIZE = 30;
const MINION_TYPES = {
  'MURLOC': 1,
  'BEAST': 2,
  'NONE': -1
};
const CARD_RARITIES = {
  COMMON: 0,
  RARE: 1,
  EPIC: 2,
  LEGENDARY: 3
};
var _ = require('lodash');
var Set = require('./util/Set');

function generateUniqueId(name) {
  return name;
}

var Card = function () {

};

Card.prototype.rarity = CARD_RARITIES.COMMON;
Card.prototype.cost = 0;

var MinionCard = function (properties) {
  this.effects = new Set();
  this.active_effects = new Set();
  if (properties.type && properties.type in MINION_TYPES) {
    this.type = properties.type;
  } else {
    this.type = MINION_TYPES.NONE;
  }
  this.health = properties.health || throw new Error('Cannot create minion card without health value');
  this.attack = +properties.attack;
  this.cost = +properties.cost;
  this.name = properties.name;
  this.id = generateUniqueId(this.name);
};
MinionCard.prototype = Object.create(Card.prototype);
MinionCard.prototype.constructor = MinionCard;

MinionCard.prototype.health = 0;
MinionCard.prototype.attack = 0;
MinionCard.prototype.effects = null;
MinionCard.prototype.active_effects = null;
MinionCard.prototype.damage = 0;
MinionCard.prototype.type = MINION_TYPES.NONE;
MinionCard.prototype.name = "";
MinionCard.prototype.id = 0;

var WeaponCard = function () {

};
WeaponCard.prototype = Object.create(Card.prototype);
WeaponCard.prototype.constructor = WeaponCard;

WeaponCard.prototype.attack = 0;
WeaponCard.prototype.durability = 0;

var SpellCard = function () {

};
SpellCard.prototype = Object.create(Card.prototype);
SpellCard.prototype.constructor = SpellCard;

SpellCard.prototype.spell = function (target) {};

var MurlocRaider = function () {
}

MurlocRaider.prototype = Object.create(MinionCard.prototype);
MurlocRaider.prototype.constructor = MurlocRaider;

MurlocRaider.prototype.name = "Murloc Raider";
MurlocRaider.prototype.cost = 1;
MurlocRaider.prototype.health = 1;
MurlocRaider.prototype.attack = 2;
MurlocRaider.prototype.type = MINION_TYPES.MURLOC;

module.exports = [
  {
    hero: 'Garrosh Hellscream',
    cards: [
      new MurlocRaider(),
      new MurlocRaider()
    ]
  }
]
