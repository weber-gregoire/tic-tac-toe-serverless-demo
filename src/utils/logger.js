const winston = require('winston');
const config = require('../config');

winston.level = config.debug ? 'debug' : 'info';

module.exports = {

  debug(format, ...params) {
    winston.log.apply(this, ['debug', format].concat(params));
  },

  info(format, ...params) {
    winston.log.apply(this, ['info', format].concat(params));
  },

  warn(format, ...params) {
    winston.log.apply(this, ['warn', format].concat(params));
  },

  error(format, ...params) {
    winston.log.apply(this, ['error', format].concat(params));
  },

};
