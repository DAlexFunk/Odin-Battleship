import { Ship } from "../src/modules/ship";

describe("Ship class", () => {
  const ship = new Ship(4);

  test("Correctly gets the length", () => {
    expect(ship.length).toBe(4);
  });

  test("Correctly gets the number of hits", () => {
    expect(ship.numHits).toBe(0);
  });

  test("hit() properly increments the numHits", () => {
    expect(ship.numHits).toBe(0);
    ship.hit();
    expect(ship.numHits).toBe(1);

    ship.numHits = 0;
  });

  test("hit() does not go over the length if called too many times", () => {
    ship.numHits = 4;
    expect(() => ship.hit()).toThrow();
    expect(ship.numHits).toBe(4);

    ship.numHits = 0;
  });

  test("isSunk correctly returns proper value", () => {
    expect(ship.isSunk()).toBe(false);

    ship.numHits = ship.length;

    expect(ship.isSunk()).toBe(true);

    ship.numHits = 0;
  });
});
