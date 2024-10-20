import "./styles.css";
import { Ship, Gameboard, Player, Formatter } from "./modules/barrel";

function playerTurn(evt) {
  const cell = evt.target;
  const position = Formatter.getIndexOfCellInBoard(cell, cell.parentElement);
  const attackResult = computerPlayer.gameboard.recieveAttack(...position);
  if (attackResult) {
    cell.className += " shotAt";
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
  const possibleShots = Array.from(
    document.querySelectorAll("#playerBoard .gridItem:not(.shotAt)")
  );
  let cell = possibleShots[Math.floor(Math.random() * possibleShots.length)];

  const position = Formatter.getIndexOfCellInBoard(cell, cell.parentElement);
  const attackResult = humanplayer.gameboard.recieveAttack(...position);
  if (attackResult) {
    cell.className += " shotAt";
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

function startGame() {
  const computerGridCells = document.querySelectorAll("#computerBoard .gridItem");
  computerGridCells.forEach((cell) =>
    cell.addEventListener("click", playerTurn)
  );

  computerPlayer.generateRandomShips();

  document.querySelector("button#startGame").remove();
  document.querySelector("button#randomButton").remove();
}

const humanplayer = new Player("Alex");
humanplayer.generateRandomShips();

const computerPlayer = new Player("CPU");

Formatter.displayGameboard(
  humanplayer.gameboard,
  document.querySelector("div#playerBoard")
);

document.querySelector("button#randomButton").addEventListener("click", () => {
  humanplayer.generateRandomShips();
  Formatter.displayGameboard(
    humanplayer.gameboard,
    document.querySelector("div#playerBoard")
  );
});

document.querySelector("button#startGame").addEventListener("click", startGame);
