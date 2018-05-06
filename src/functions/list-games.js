const { successHandler, serverErrorHandler } = require('../utils/handlers-helper');
const { getAllGames } = require('../services/game');

// noinspection JSUnusedGlobalSymbols
module.exports.handler = async (event, context, callback) => {
  try {
    const activeGames = await getAllGames();
    await successHandler(callback)(activeGames);
  } catch (err) {
    await serverErrorHandler(callback)(err);
  }
};
