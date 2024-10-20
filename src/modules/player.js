import { Gameboard } from "./gameboard";
import { Formatter } from "./formatter";

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }

  placeShips(...ships) {
    for (let ship of ships) {
      this.gameboard.placeShip(...ship);
    }
  }

  takeTurn(cell, opposingGameBoard) {
    const position = Formatter.getIndexOfCellInBoard(cell, computerBoard);
    const attackResult = opposingGameBoard.recieveAttack(...position);
    if (attackResult) {
      cell.style["background-color"] = attackResult === "hit" ? "red" : "black";
      cell.removeEventListener("click", this.takeTurn);
    }

    if (opposingGameBoard.allSunk()) {
      alert("YOU WIn");
      opposingGameBoard.forEach((cell) =>
        cell.removeEventListener("click", this.takeTurn)
      );
    }
  }
}

export { Player };
