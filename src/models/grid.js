class Grid {

  constructor(gridData) {
    this._rows = gridData;
  }

  getRows() {
    return [].concat(this._rows);
  }

  getColumns() {
    return Object.keys(this._rows[0]).map(c => this._rows.map(r => r[c]));
  }

  get({ x, y }) {
    return this._rows[x][y];
  }

  set({ x, y }, symbol) {
    this._rows[x][y] = symbol;
  }

  getDiagonals() {
    const diagonals = [];
    diagonals.push(this._rows.map((element, index) => this._rows[index][index]));
    diagonals.push(
      this._rows.map((element, index) => this._rows[index][this._rows.length - index - 1]),
    );
    return diagonals;
  }

}

module.exports = { Grid };
