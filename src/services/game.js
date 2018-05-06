const gameDao = require('../dao/game');
const { Grid } = require('../models/grid');
const uuid = require('node-uuid');

const PLAYERS_SYMBOLS = ['X', 'O'];

const initialGame = {
  id: uuid.v4(),
  grid: [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-'],
  ],
  lastPlayer: PLAYERS_SYMBOLS[1],
  gameOver: false,
};

module.exports = {

  createGame: () => gameDao.createGame(initialGame),

  findGameById: gameId => gameDao.findGameById(gameId),

  play: (gameId, playerSymbol, { x, y }) => {},

  getAllGames: () => gameDao.getAllGames(),

};