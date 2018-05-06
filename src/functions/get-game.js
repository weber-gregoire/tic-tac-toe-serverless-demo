const { successHandler, serverErrorHandler, clientErrorHandler } = require('../utils/handlers-helper');
const { findGameById } = require('../services/game');

// noinspection JSUnusedGlobalSymbols
module.exports.handler = async (event, context, callback) => {
  const { gameId } = event.path;
  try {
    const game = await findGameById(gameId);
    if (game) {
      successHandler(callback)(game);
    } else {
      clientErrorHandler(callback)(new Error(`Unknown game ${gameId}`));
    }
  } catch (err) {
    serverErrorHandler(callback)(err);
  }
};
