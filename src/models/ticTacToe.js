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

  constructor(tictactoeData) {
    this.id = tictactoeData.id || uuid.v4();
    this.grid = new Grid(tictactoeData.grid);
    this.lastPlayer = tictactoeData.lastPlayer;
    this.winner = tictactoeData.winner;
    this.gameOver = tictactoeData.gameOver;
  }

  isGameOver() {
    return this._isAnyComplete(this.grid.getRows()) ||
      this._isAnyComplete(this.grid.getColumns()) ||
      this._isAnyComplete(this.grid.getDiagonals()) ||
      this._isGridComplete();
  }

  getCurrentPlayerSymbol() {
    return PLAYERS_SYMBOLS[(this.lastPlayer + 1) % 2];
  }

  addMove(playerSymbol, coordinates) {
    if (!this._isPlayerTurn(playerSymbol)) {
      throw new Error('It is not your turn to play');
    } else if (!this._isValidMove(coordinates)) {
      throw new Error('Invalid move');
    } else {
      this.grid[coordinates.x][coordinates.y] = playerSymbol;
      this.lastPlayer = PLAYERS_SYMBOLS.indexOf(playerSymbol);
    }
  }

  _isPlayerTurn(playerSymbol) {
    return (PLAYERS_SYMBOLS[this.getCurrentPlayerSymbol()] === playerSymbol);
  }

  _isValidMove(coordinates) {
    return this.grid[coordinates.x][coordinates.y] === undefined;
  }

  _isAnyComplete(rows) {
    const rowResults = rows.map(row => this._isComplete(row));
    const positiveResults = rowResults.filter(result => !!result);
    if (positiveResults.length > 0) {
      [this.winner] = positiveResults;
      return true;
    }
    return false;
  }

  _isGridComplete() {
    const completedRows = this.grid.getRows().filter((row) => {
      const usedCells = row.filter(cell => !!cell);
      return usedCells.length === row.length;
    });
    return completedRows.length === this.grid.getRows().length;
  }

}

const initialGame = {
  grid: [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ],
  lastPlayer: PLAYERS_SYMBOLS[1],
  winner: undefined,
};

module.exports = { TicTacToe, initialGame };

