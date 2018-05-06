const AWS = require('aws-sdk');

const config = {
  aws: {
    dynamodb: {
      region: process.env.AWS_REGION_CODE,
      endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
      credentials: new AWS.Credentials('aKey', 'aSecretKey'),
    },
  },
  debug: !!process.env.DEBUG,
};

/* eslint no-console: "off" */
console.log('Application configuration:\n', JSON.stringify(config));

module.exports = config;
