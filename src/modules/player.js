import { Gameboard } from "./gameboard";
import { Formatter } from "./formatter";

class Player {
  constructor(name, opposingPlayer) {
    this.name = name;
    this.opposingPlayer = opposingPlayer
    this.gameboard = new Gameboard();
  }

  placeShips(...ships) {
    for (let ship of ships) {
      this.gameboard.placeShip(...ship);
    }
  }
}

export { Player };
