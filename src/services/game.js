const gameDao = require('../dao/game');
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

const gameService = {

  createGame: () => gameDao.createGame(initialGame),

  findGameById: gameId => gameDao.findGameById(gameId),

  play: async (gameId, playerSymbol, coordinates) => {
    const game = await gameService.findGameById(gameId);
    game.addMove(playerSymbol, coordinates);
    return gameDao.updateGame(game);
  },

  getAllGames: () => gameDao.getAllGames(),

};

module.exports = gameService;
