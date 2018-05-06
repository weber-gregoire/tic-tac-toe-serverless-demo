const { successHandler, serverErrorHandler } = require('../utils/handlers-helper');
const { play } = require('../services/game');

// noinspection JSUnusedGlobalSymbols
module.exports.handler = async (event, context, callback) => {
  try {
    const { gameId } = event.path;
    const { playerSymbol, coordinates } = event.body;
    const result = await play(gameId, playerSymbol, coordinates);
    successHandler(callback)(result);
  } catch (err) {
    serverErrorHandler(callback)(err);
  }
};
