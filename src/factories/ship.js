const shipNames = require("../helpers/shipNames");

class Ship {
  constructor(name, pos) {
    this.name = name;
    this.pos = pos;
    this.health = shipNames[name].size;
    this.length = shipNames[name].size;
    this.hits = [];
  }
  hit(pos) {
    this.hits.push(pos);
    this.health--;
  }
  isSunk() {
    return this.health === 0;
  }
}

module.exports = Ship;
