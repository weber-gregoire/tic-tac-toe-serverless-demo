const { successHandler, serverErrorHandler } = require('../utils/handlers-helper');
const gameDao = require('../dao/game');

// noinspection JSUnusedGlobalSymbols
module.exports.handler = async (event, context, callback) => {
  try {
    const activeGames = await gameDao.getAllGames();
    await successHandler(callback)(activeGames);
  } catch (err) {
    await serverErrorHandler(callback)(err);
  }
};
