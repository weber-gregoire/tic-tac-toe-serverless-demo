const NestedError = require('nested-error-stacks');

module.exports.successHandler = function (callback) {
  return (result) => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
    callback(null, response);
  };
};

module.exports.clientErrorHandler = function (callback) {
  return (error) => {
    callback(new NestedError('[400] Bad Request', error));
  };
};

module.exports.serverErrorHandler = function (callback) {
  return (error) => {
    callback(new NestedError('[500] Internal server error', error));
  };
};
