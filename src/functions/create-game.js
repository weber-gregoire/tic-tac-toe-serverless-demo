const { successHandler, serverErrorHandler } = require('../utils/handlers-helper');
const { createGame } = require('../services/game');

// noinspection JSUnusedGlobalSymbols
module.exports.handler = async (event, context, callback) => {
  try {
    const result = await createGame();
    await successHandler(callback)(result);
  } catch (err) {
    await serverErrorHandler(callback)(err);
  }
};
