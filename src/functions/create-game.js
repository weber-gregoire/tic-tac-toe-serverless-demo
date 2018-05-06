const { successHandler, serverErrorHandler } = require('../utils/handlers-helper');

// noinspection JSUnusedGlobalSymbols
module.exports.handler = async (event, context, callback) => {
  try {
    const result = {};
    await successHandler(callback)(result);
  } catch (err) {
    await serverErrorHandler(callback)(err);
  }
};
