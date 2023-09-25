import shipNames from "../helpers/shipNames";

class Ship {
  constructor(name, pos) {
    this.name = name;
    this.pos = pos;
    this.health = shipNames[name].size;
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

export default Ship;
