const shipNames = require("../helpers/shipNames");

class Ship {
  constructor(name) {
    this.name = name;
    this.health = shipNames[name].size;
    this.length = shipNames[name].size;
  }
  hit() {
    this.health--;
  }
  isSunk() {
    return this.health === 0;
  }
}

module.exports = Ship;
