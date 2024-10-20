const Formatter = {
  getCorrectDOMCell: (row, col, location) => {
    return location.children[row * 10 + col];
  },

  getIndexOfCellInBoard: (cell, board) => {
    const index = Object.values(board.children).indexOf(cell);
    return [Math.floor(index / 10), index % 10];
  },

  displayGameboard: (gameboard, location) => {
    Object.values(location.children).forEach((cell) => {cell.style["background-color"] = ""})
    for (let row = 0; row < gameboard.gameboard.length; row++) {
      for (let col = 0; col < gameboard.gameboard[row].length; col++) {
        if (gameboard.gameboard[row][col])
          Formatter.getCorrectDOMCell(row, col, location).style["background-color"] = "#6B7D7D";
      }
    }
  },
};

export { Formatter };
