import { Ship } from "./ship.js";

class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.ships = [];
    this.missedShots = [];
    this.gameboard = Array.from({ length: size }, () => Array(size).fill(null));
  }

  #validPlacement(row, col, shipLength, direction) {
    if (row < 0 || row >= this.size) return false;
    if (col < 0 || col >= this.size) return false;
    if (shipLength < 1 || shipLength > this.size) return false;
    if (direction !== "horizontal" && direction !== "vertical") return false;
    if (this.gameboard[row][col]) return false;

    if (direction === "vertical") {
      if (row + shipLength >= this.size) return false;
      for (let i = 0; i < shipLength; i++) {
        if (this.gameboard[row + i][col]) return false;
      }
    } else {
      if (col + shipLength >= this.size) return false;
      for (let i = 0; i < shipLength; i++) {
        if (this.gameboard[row][col + i]) return false;
      }
    }

    return true;
  }

  placeShip(row, col, shipLength, direction) {
    if (!this.#validPlacement(row, col, shipLength, direction))
      throw new Error("Invalid ship placement");

    const newShip = new Ship(shipLength);

    this.gameboard[row][col] = newShip;
    this.ships.push(newShip);

    if (direction === "horizontal") {
      for (let i = 1; i < shipLength; i++) {
        this.gameboard[row][col + i] = [row, col];
      }
    } else {
      for (let i = 1; i < shipLength; i++) {
        this.gameboard[row + i][col] = [row, col];
      }
    }

    return this.gameboard;
  }

  recieveAttack(row, col) {
    if (row < 0 || row >= this.size)
      throw new Error(".recieveAttack() Index out of range");
    else if (col < 0 || col >= this.size)
      throw new Error(".recieveAttack() Index out of range");
    else if (this.missedShots.includes([row, col])) return false;

    if (!this.gameboard[row][col]) {
      this.missedShots.push([row, col]);
      return true;
    } else if (Array.isArray(this.gameboard[row][col])) {
      [row, col] = this.gameboard[row][col];
    }

    this.gameboard[row][col].hit();
    return true;
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export { Gameboard };
