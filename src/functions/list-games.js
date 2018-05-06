const { successHandler, serverErrorHandler } = require('../utils/handlers-helper');
const { getAllGames } = require('../services/game');

// noinspection JSUnusedGlobalSymbols
module.exports.handler = async (event, context, callback) => {
  try {
    const activeGames = await getAllGames();
    successHandler(callback)(activeGames);
  } catch (err) {
    serverErrorHandler(callback)(err);
  }
};
