import { Gameboard } from "./gameboard";
import { Formatter } from "./formatter";

class Player {
  constructor(name, opposingPlayer) {
    this.name = name;
    this.opposingPlayer = opposingPlayer;
    this.gameboard = new Gameboard();
  }

  placeShips(...ships) {
    for (let ship of ships) {
      this.gameboard.placeShip(...ship);
    }
  }

  generateRandomShips() {
    this.gameboard.clearShips();
    console.log(this.gameboard.ships)
    const lengths = [2, 3, 3, 4, 5];
    let i = 0;
    while (i < lengths.length) {
      try {
        let row = Math.floor(Math.random() * this.gameboard.size);
        let col = Math.floor(Math.random() * this.gameboard.size);
        let direction =
          Math.round(Math.random()) === 1 ? "horizontal" : "vertical";
        this.gameboard.placeShip(row, col, lengths[i], direction);
        ++i;
      } catch {}
    }
  }
}

export { Player };
