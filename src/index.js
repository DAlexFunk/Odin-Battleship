import "./styles.css";
import { Ship, Gameboard, Player, Formatter } from "./modules/barrel";

function takeTurn(evt) {
  const cell = evt.target;
  const position = Formatter.getIndexOfCellInBoard(cell, computerBoard);
  const attackResult = computerGameBoard.recieveAttack(...position);
  if (attackResult) {
    cell.style["background-color"] = attackResult === "hit" ? "red" : "black";
    cell.removeEventListener("click", takeTurn);
  }

  if (computerGameBoard.allSunk()) {
    alert("YOU WIn");
    computerGridCells.forEach((cell) =>
      cell.removeEventListener("click", takeTurn)
    );
  }
}

const humanplayer = new Player();
humanplayer.placeShips(
  [1, 1, 2, "vertical"],
  [7, 1, 3, "horizontal"],
  [7, 7, 3, "vertical"],
  [3, 3, 4, "horizontal"],
  [5, 5, 5, "horizontal"]
);

const computerPlayer = new Player();
computerPlayer.placeShips(
  [1, 1, 2, "vertical"],
  [7, 1, 3, "horizontal"],
  [7, 7, 3, "vertical"],
  [3, 3, 4, "horizontal"],
  [5, 5, 5, "horizontal"]
);

Formatter.displayGameboard(
  humanplayer.gameboard,
  document.querySelector("div#playerBoard")
);

const computerGridCells = document.querySelectorAll(
  "div#computerBoard div.gridItem"
);
const computerBoard = document.querySelector("div#computerBoard");

computerGridCells.forEach((cell) => cell.addEventListener("click", () => humanplayer.takeTurn(cell, computerPlayer.gameboard)));
