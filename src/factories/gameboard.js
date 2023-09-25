class Gameboard {
  #boardSize = 10;
  constructor() {
    this.board = [];
    this.ships = [];
    this.missedShots = [];
    this.hits = [];
    this.owner = null;
    this.initializeEmptyBoard();
  }

  initializeEmptyBoard() {
    for (let i = 0; i < this.#boardSize; i++) {
      this.board.push([]);
      for (let j = 0; j < this.#boardSize; j++) {
        this.board[i].push(null);
      }
    }
  }

  placeShip(ship, pos, dir) {
    const isValidPlacement = (ship, pos, dir) => {
      if (dir === "horizontal") {
        for (let i = 0; i < ship.length; i++) {
          if (this.board[pos[0]]?.[pos[1] + i] !== null) {
            return false;
          }
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          if (this.board[pos[0] + i]?.[pos[1]] !== null) {
            return false;
          }
        }
      }
      return true;
    };
    const isValid = isValidPlacement(ship, pos, dir);
    if (isValid) {
      if (dir === "horizontal") {
        for (let i = 0; i < ship.length; i++) {
          this.board[pos[0]][pos[1] + i] = ship;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          this.board[pos[0] + i][pos[1]] = ship;
        }
      }
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  receiveAttack(pos) {
    const aggregateHits = [...this.hits, ...this.missedShots];
    if (aggregateHits.some((hit) => hit[0] === pos[0] && hit[1] === pos[1])) {
      return false;
    }

    if (this.board[pos[0]][pos[1]] !== null) {
      this.board[pos[0]][pos[1]].hit(pos);
      this.hits.push(pos);
      return true;
    }
    this.missedShots.push(pos);
    return true;
  }

  allSunk() {
    if (this.ships.length === 0) {
      return false;
    }
    return this.ships.every((ship) => ship.isSunk());
  }
}

module.exports = Gameboard;
