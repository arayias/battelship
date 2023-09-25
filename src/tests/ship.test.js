const Ship = require("../factories/ship");

describe("Ship", () => {
  test("Ship is created with a name and position and receives hit correctly", () => {
    const ship = new Ship("Carrier");
    ship.hit();
    expect(ship.health).toBe(4);
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship is sunk when health is 0", () => {
    const ship = new Ship("Carrier");
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.health).toBe(0);
    expect(ship.isSunk()).toBe(true);
  });
});
