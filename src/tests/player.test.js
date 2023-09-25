const Player = require("../factories/player");
const Gameboard = require("../factories/gameboard");
const Ship = require("../factories/ship");

describe("Player", () => {
  test("Player is created with a name and board", () => {
    const player = new Player("Player", new Gameboard());
    expect(player.name).toBe("Player");
    expect(player.board).toBeInstanceOf(Gameboard);
  });

  test("Player can place ships", () => {
    const player = new Player("Player", new Gameboard());
    const ship = new Ship("Carrier");
    player.placeShip([0, 0], "horizontal");
    console.log(player.board.board[0]);
    expect(player.board.board[0]).toEqual([
      ship,
      ship,
      ship,
      ship,
      ship,
      null,
      null,
      null,
      null,
      null,
    ]);
  });

  test("Player can attack", () => {
    const player = new Player("Player", new Gameboard());
    player.placeShip([0, 0], "horizontal");
    player.attack(player.board, [0, 0]);
    expect(player.board.board[0][0].health).toBe(4);
  });

  test("Board can be initialized with random ships", () => {
    const player = new Player(
      "Player",
      new Gameboard(),
      (goesFirst = false),
      (ai = true)
    );
    expect(player.board.ships.length).toBe(5);
  });

  test("board can be initialized with player selections", () => {
    const player = new Player("Player", new Gameboard());
    player.placeShip([0, 0], "horizontal");
    player.placeShip([1, 0], "horizontal");
    player.placeShip([2, 0], "horizontal");
    player.placeShip([3, 0], "horizontal");
    player.placeShip([4, 0], "horizontal");

    player.placeShip([0, 1], "horizontal"); // this should not place

    expect(player.board.ships.length).toBe(5);
    expect(player.ships.length).toBe(0);
  });

  test("Player can swap directions", () => {
    const player = new Player("Player", new Gameboard());
    player.swapDirections();
    expect(player.direction).toBe("vertical");
  });
});
