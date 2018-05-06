const { Grid } = require('./grid');

const PLAYERS_SYMBOLS = ['X', 'O'];

function isComplete(cells) {
  const contents = cells.map(cell => cell.innerText);
  const distinctContents = Array.from(new Set(contents));
  if (distinctContents.length === 1) {
    return distinctContents[0];
  }
  return false;
}

function getWinner(rows) {
  const rowResults = rows.map(row => isComplete(row));
  const positiveResults = rowResults.filter(result => result !== '-');
  if (positiveResults.length > 0) {
    return positiveResults;
  }
  return undefined;
}

class TicTacToe {

  constructor(options) {
    this.id = options.id;
    this.grid = new Grid(options.grid);
    this.lastPlayer = options.lastPlayer;
    this.winner = options.winner;
    this.gameOver = options.gameOver;
  }

  getCurrentPlayerSymbol() {
    const lastPlayerSymbolIndex = PLAYERS_SYMBOLS.indexOf(this.lastPlayer);
    return PLAYERS_SYMBOLS[(lastPlayerSymbolIndex + 1) % 2];
  }

  addMove(playerSymbol, coordinates) {
    if (!this._isPlayerTurn(playerSymbol)) {
      throw new Error('It is not your turn to play');
    } else if (!this._isValidMove(coordinates)) {
      throw new Error('Invalid move');
    } else {
      this.grid.set(coordinates, playerSymbol);
      this.lastPlayer = playerSymbol;
      this._updateStatus();
    }
  }

  toJSON() {
    return Object.assign({}, this, { grid: this.grid.getRows() });
  }

  _updateStatus() {
    this.winner = getWinner(this.grid.getRows()) ||
      getWinner(this.grid.getColumns()) ||
      getWinner(this.grid.getDiagonals());

    this.gameOver = !!this.winner || this._isGridComplete();
  }

  _isPlayerTurn(playerSymbol) {
    return (this.getCurrentPlayerSymbol() === playerSymbol);
  }

  _isValidMove(coordinates) {
    return this.grid.get(coordinates) === '-';
  }

  _isGridComplete() {
    const completedRows = this.grid.getRows().filter((row) => {
      const usedCells = row.filter(cell => cell !== '-');
      return usedCells.length === row.length;
    });
    return completedRows.length === this.grid.getRows().length;
  }

}

module.exports = { TicTacToe };

