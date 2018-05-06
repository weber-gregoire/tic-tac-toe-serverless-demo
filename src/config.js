const config = {
  aws: {
    dynamodb: {
      region: process.env.AWS_REGION_CODE,
      endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
    },
  },
  debug: !!process.env.DEBUG,
};

/* eslint no-console: "off" */
console.log('Application configuration:\n', JSON.stringify(config));

module.exports = config;
