import { Gameboard } from "../src/modules/gameboard.js";
import { Ship } from "../src/modules/ship.js";

test("Creates correct sized board", () => {
  expect(new Gameboard(5).gameboard).toEqual(
    Array.from({ length: 5 }, () => Array(5).fill(null))
  );

  expect(new Gameboard().gameboard).toEqual(
    Array.from({ length: 10 }, () => Array(10).fill(null))
  );
});

test(".placeShip() functions properly", () => {
  expect(new Gameboard(5).placeShip(0, 0, 2, "horizontal")).toEqual([
    [new Ship(2), [0, 0], null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  expect(new Gameboard(5).placeShip(0, 0, 2, "vertical")).toEqual([
    [new Ship(2), null, null, null, null],
    [[0, 0], null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ]);

  expect(new Gameboard(5).placeShip(1, 3, 3, "vertical")).toEqual([
    [null, null, null, null, null],
    [null, null, null, new Ship(3), null],
    [null, null, null, [1, 3], null],
    [null, null, null, [1, 3], null],
    [null, null, null, null, null],
  ]);
});

test(".placeShip() throws errors if invalid ship placements", () => {
  expect(() => new Gameboard(5).placeShip(8, 8, 2, "vertical")).toThrow();
  expect(() => new Gameboard(5).placeShip(-5, 8, 2, "horizontal")).toThrow();
  expect(() => new Gameboard(5).placeShip(0, 0, 0, "horizontal")).toThrow();
  expect(() => new Gameboard(5).placeShip(0, 0, 10, "horizontal")).toThrow();
  expect(() => new Gameboard(5).placeShip(0, 0, 2, "diagonal")).toThrow();
  expect(() => {
    const board = new Gameboard(5);
    board.placeShip(0, 0, 1, "horizontal");
    board.placeShip(0, 0, 2, "vertical");
  }).toThrow();
  expect(() => {
    const board = new Gameboard(5);
    board.placeShip(0, 1, 3, "vertical");
    board.placeShip(1, 0, 3, "horizontal");
  }).toThrow();
});

test(".recieveAttack() functions properly", () => {
  const board = new Gameboard(5);
  board.placeShip(0, 0, 3, "horizontal");
  board.placeShip(1, 0, 2, "vertical");
  board.recieveAttack(0, 0);
  board.recieveAttack(0, 1);
  board.recieveAttack(2, 0);
  board.recieveAttack(4, 4);
  board.recieveAttack(3, 4);

  const testShip1 = new Ship(3);
  const testShip2 = new Ship(2);
  testShip1.hit();
  testShip1.hit();
  testShip2.hit();
  expect(board.missedShots).toEqual([
    [4, 4],
    [3, 4],
  ]);
  expect(board.ships).toEqual([testShip1, testShip2]);
});

test(".recieveAttack() throws errors if invalid indices", () => {
  expect(() => new Gameboard().recieveAttack(12, 0)).toThrow();
  expect(() => new Gameboard().recieveAttack(0, 12)).toThrow();
  expect(() => new Gameboard.recieveAttack(-5, -5)).toThrow();
});

test(".allSunk() returns true if and only if all ships are sunk", () => {
  const board = new Gameboard();
  board.placeShip(0, 0, 1, "horizontal");
  board.placeShip(4, 5, 2, "vertical");
  board.recieveAttack(0, 0);
  board.recieveAttack(5, 5);

  expect(board.allSunk()).toBe(false);

  board.recieveAttack(4, 5);

  expect(board.allSunk()).toBe(true);
});

test(".allSunk() returns true if there are no ships (Vacuous truth)", () => {
  expect(new Gameboard().allSunk()).toBe(true);
});
