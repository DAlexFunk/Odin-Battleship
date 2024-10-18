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
    computerGridCells.forEach((cell) => cell.removeEventListener("click", takeTurn));
  }
}

const playerGameboard = new Gameboard();
playerGameboard.placeShip(1, 1, 2, "vertical");
playerGameboard.placeShip(7, 1, 3, "horizontal");
playerGameboard.placeShip(7, 7, 3, "vertical");
playerGameboard.placeShip(3, 3, 4, "horizontal");
playerGameboard.placeShip(5, 5, 5, "horizontal");

const computerGameBoard = new Gameboard();
computerGameBoard.placeShip(1, 1, 2, "vertical");
computerGameBoard.placeShip(7, 1, 3, "horizontal");
computerGameBoard.placeShip(7, 7, 3, "vertical");
computerGameBoard.placeShip(3, 3, 4, "horizontal");
computerGameBoard.placeShip(5, 5, 5, "horizontal");

Formatter.displayGameboard(
  playerGameboard,
  document.querySelector("div#playerBoard")
);

const computerGridCells = document.querySelectorAll("div#computerBoard div.gridItem");
const computerBoard = document.querySelector("div#computerBoard");

computerGridCells.forEach((cell) => cell.addEventListener("click", takeTurn));
