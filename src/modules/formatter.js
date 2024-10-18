const Formatter = {
  getCorrectDOMCell: (row, col, location) => {
    return location.children[row * 10 + col];
  },

  displayGameboard: (gameboard, location) => {
    for (let row = 0; row < gameboard.gameboard.length; row++) {
      for (let col = 0; col < gameboard.gameboard[row].length; col++) {
        if (gameboard.gameboard[row][col])
          Formatter.getCorrectDOMCell(row, col, location).style["background-color"] = "#6B7D7D";
      }
    }
  },
};

export { Formatter };
