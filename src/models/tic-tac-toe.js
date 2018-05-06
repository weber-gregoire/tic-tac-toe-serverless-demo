const { Grid } = require('./grid');
const uuid = require('node-uuid');

const PLAYERS_SYMBOLS = ['X', 'O'];

function isComplete(cells) {
  const contents = cells.map(cell => cell.innerText);
  const distinctContents = Array.from(new Set(contents));
  if (distinctContents.length === 1) {
    return distinctContents[0];
  }
  return false;
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
    return PLAYERS_SYMBOLS[(this.lastPlayer + 1) % 2];
  }

  addMove(playerSymbol, { x, y }) {
    if (!this._isPlayerTurn(playerSymbol)) {
      throw new Error('It is not your turn to play');
    } else if (!this._isValidMove({ x, y })) {
      throw new Error('Invalid move');
    } else {
      this.grid[x][y] = playerSymbol;
      this.lastPlayer = PLAYERS_SYMBOLS.indexOf(playerSymbol);
      this._updateStatus();
    }
  }

  _updateStatus() {
    this.winner = this._getWinner(this.grid.getRows()) ||
      this._getWinner(this.grid.getColumns()) ||
      this._getWinner(this.grid.getDiagonals());

    this.gameOver = !!this.winner || this._isGridComplete();
  }

  _isPlayerTurn(playerSymbol) {
    return (PLAYERS_SYMBOLS[this.getCurrentPlayerSymbol()] === playerSymbol);
  }

  _isValidMove({ x, y }) {
    return this.grid[x][y] === '-';
  }

  _getWinner(rows) {
    const rowResults = rows.map(row => isComplete(row));
    const positiveResults = rowResults.filter(result => result !== '-');
    if (positiveResults.length > 0) {
      return positiveResults;
    }
    return undefined;
  }

  _isGridComplete() {
    const completedRows = this.grid.getRows().filter((row) => {
      const usedCells = row.filter(cell => cell !== '-');
      return usedCells.length === row.length;
    });
    return completedRows.length === this.grid.getRows().length;
  }

}

module.exports = { TicTacToe, initialGame };

