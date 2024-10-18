import "./styles.css";
import { Ship, Gameboard, Player, Formatter } from "./modules/barrel";

const gridCell = document.querySelectorAll("div.gridItem");

const playerGameboard = new Gameboard();
playerGameboard.placeShip(1, 1, 2, "vertical");
playerGameboard.placeShip(7, 1, 3, "horizontal");
playerGameboard.placeShip(7, 7, 3, "vertical");
playerGameboard.placeShip(3, 3, 4, "horizontal");
playerGameboard.placeShip(5, 5, 5, "horizontal");
Formatter.displayGameboard(
  playerGameboard,
  document.querySelector("div#playerBoard")
);
