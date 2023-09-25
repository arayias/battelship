const Player = require("./factories/player");
const Gameboard = require("./factories/gameboard");
const {
  renderBoard,
  renderHeadings,
  addListeners,
  renderStartButton,
} = require("./dom");

let player1;
let player2;

const gameInit = () => {
  player1 = new Player(
    "You",
    new Gameboard(),
    (goesFirst = true),
    (ai = false)
  );
  player2 = new Player(
    "Enemy",
    new Gameboard(),
    (goesFirst = false),
    (ai = true)
  );
  renderHeadings(player1, player2);
  renderBoard(player1, player2);
  renderStartButton();
  addListeners(player1, player2);
  return { player1, player2 };
};

module.exports = { gameInit };
