class Ship {
  constructor(length) {
    this.length = length;
    this.numHits = 0;
  }

  hit() {
    if (this.numHits < this.length) {
      ++this.numHits;
    } else {
      throw new Error("Hitting an already sunk ship");
    }
  }

  isSunk() {
    return this.length === this.numHits;
  }
}

export { Ship };
