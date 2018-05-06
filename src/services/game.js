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

  play: async (gameId, playerSymbol, coordinates) => {
    const game = await findGameById(gameId);
    game.addMove(playerSymbol, coordinates);
    return await gameDao.updateGame(game);
  },

  getAllGames: () => gameDao.getAllGames(),

};