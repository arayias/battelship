const Gameboard = require("../factories/gameboard");
const Ship = require("../factories/ship");

describe("Gameboard", () => {
  test("Gameboard is created with an empty board", () => {
    const gameboard = new Gameboard();
    expect(gameboard.board).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });
  test("Gameboard can place ships", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("Carrier");
    gameboard.placeShip(ship, [0, 0], "horizontal");
    expect(gameboard.board[0]).toEqual([
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
  test("Gameboard can place ships vertically", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("Carrier");
    gameboard.placeShip(ship, [0, 0], "vertical");
    expect(gameboard.board[0][0]).toEqual(ship);
    expect(gameboard.board[1][0]).toEqual(ship);
    expect(gameboard.board[2][0]).toEqual(ship);
    expect(gameboard.board[3][0]).toEqual(ship);
    expect(gameboard.board[4][0]).toEqual(ship);
  });
  test("Gameboard can't place ships outside of the board", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("Carrier");
    expect(gameboard.placeShip(ship, [0, 9], "horizontal")).toBe(false);
    expect(gameboard.placeShip(ship, [9, 0], "vertical")).toBe(false);
  });
  test("Gameboard can receive attacks", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("Carrier");
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.board[0][0].health).toBe(4);
  });
  test("Gameboard can report if all ships are sunk", () => {
    const gameboard = new Gameboard();
    expect(gameboard.allSunk()).toBe(false);
    const ship = new Ship("Carrier");
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 2]);
    gameboard.receiveAttack([0, 3]);
    gameboard.receiveAttack([0, 4]);
    expect(gameboard.allSunk()).toBe(true);
  });
  test("Gameboard can report if a shot has been missed and avoids multiple hits on same location", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack([0, 0]);
    expect(gameboard.missedShots).toEqual([[0, 0]]);
    expect(gameboard.receiveAttack([0, 0])).toBe(false);
    expect(gameboard.missedShots).toEqual([[0, 0]]);
  });
  test("randomAttack attacks a random position", () => {
    const gameboard = new Gameboard();
    const ship = new Ship("Carrier");
    gameboard.placeShip(ship, [0, 0], "horizontal");
    gameboard.randomAttack();
    expect(gameboard.hits.length + gameboard.missedShots.length).toBe(1);
  });
});
