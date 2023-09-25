const Ship = require("../factories/ship");

describe("Ship", () => {
  test("Ship is created with a name and position and receives hit correctly", () => {
    const ship = new Ship("Carrier", [0, 0]);
    ship.hit([0, 0]);
    expect(ship.health).toBe(4);
    expect(ship.hits).toEqual([[0, 0]]);
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship is sunk when health is 0", () => {
    const ship = new Ship("Carrier", [0, 0]);
    ship.hit([0, 0]);
    ship.hit([0, 1]);
    ship.hit([0, 2]);
    ship.hit([0, 3]);
    ship.hit([0, 4]);
    expect(ship.health).toBe(0);
    expect(ship.hits).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
    ]);
    expect(ship.isSunk()).toBe(true);
  });
});
