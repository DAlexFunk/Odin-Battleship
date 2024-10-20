import "./styles.css";
import { Ship, Gameboard, Player, Formatter } from "./modules/barrel";

function playerTurn(evt) {
  const cell = evt.target;
  const position = Formatter.getIndexOfCellInBoard(cell, cell.parentElement);
  const attackResult = computerPlayer.gameboard.recieveAttack(...position);
  if (attackResult) {
    cell.className += " shotAt"
    cell.style["background-color"] = attackResult === "hit" ? "red" : "black";
    cell.removeEventListener("click", playerTurn);
  }

  if (computerPlayer.gameboard.allSunk()) {
    const cells = document.querySelectorAll("div.gridItem");
    alert("YOU Win");
    cells.forEach((cell) => {
      cell.removeEventListener("click", playerTurn);
      cell.removeEventListener("click", computerTurn);
    });
  }

  computerTurn();
}

function computerTurn() {
  const possibleShots = Array.from(document.querySelectorAll("#playerBoard .gridItem:not(.shotAt)"))
  let cell = possibleShots[Math.floor(Math.random() * possibleShots.length)];

  const position = Formatter.getIndexOfCellInBoard(cell, cell.parentElement);
  const attackResult = humanplayer.gameboard.recieveAttack(...position);
  if (attackResult) {
    cell.className += " shotAt"
    cell.style["background-color"] = attackResult === "hit" ? "red" : "black";
    cell.removeEventListener("click", playerTurn);
  }

  if (humanplayer.gameboard.allSunk()) {
    const cells = document.querySelectorAll("div.gridItem");
    alert("Computer Wins");
    cells.forEach((cell) => {
      cell.removeEventListener("click", playerTurn);
    });
  }
}

const humanplayer = new Player("Alex");
humanplayer.placeShips(
  [1, 1, 2, "vertical"],
  [7, 1, 3, "horizontal"],
  [7, 7, 3, "vertical"],
  [3, 3, 4, "horizontal"],
  [5, 5, 5, "horizontal"]
);

const computerPlayer = new Player("CPU");
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

const computerGridCells = document.querySelectorAll("#computerBoard .gridItem");

computerGridCells.forEach((cell) => cell.addEventListener("click", playerTurn));
