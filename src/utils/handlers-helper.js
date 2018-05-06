const NestedError = require('nested-error-stacks');

module.exports.successHandler = function (callback) {
  return (result) => {
    callback(null, result);
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
