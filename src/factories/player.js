const shipNames = require("../helpers/shipNames");
const Ship = require("./ship");

class Player {
  constructor(name, board, goesFirst, ai = false) {
    this.name = name;
    this.board = board;
    this.turn = goesFirst;
    this.ships = [...Object.keys(shipNames)];
    this.ai = ai;
    this.direction = "horizontal";

    this.initializeBoardWithShips();
  }

  initializeBoardWithShips() {
    if (!this.ai) {
      return;
    }
    while (this.ships.length > 0) {
      const shipObj = new Ship(this.ships[0]);
      const pos = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
      const dir = Math.random() > 0.5 ? "horizontal" : "vertical";
      this.board.placeShip(shipObj, pos, dir) ? this.ships.shift() : null;
    }
  }

  placeShip(pos, dir = this.direction) {
    if (this.ships.length === 0) {
      return false;
    }
    const currentShip = new Ship(this.ships[0]);
    if (this.board.placeShip(currentShip, pos, dir)) {
      this.ships.shift();
      return true;
    } else {
      return false;
    }
  }

  swapDirections() {
    this.direction =
      this.direction === "horizontal" ? "vertical" : "horizontal";
  }

  attack(enemyBoard, pos) {
    if (pos === undefined) {
      return enemyBoard.randomAttack();
    }

    return enemyBoard.receiveAttack(pos);
  }
}

module.exports = Player;
