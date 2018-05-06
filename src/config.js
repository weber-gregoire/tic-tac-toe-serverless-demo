const config = {
  aws: {
    dynamodb: {
      region: process.env.AWS_REGION_CODE,
    },
  },
  debug: !!process.env.DEBUG,
  offline: process.env.IS_OFFLINE,
};

if (config.offline) {
  config.aws.dynamodb.endpoint = 'http://localhost:8000';
}

/* eslint no-console: "off" */
console.log('Application configuration:\n', JSON.stringify(config));

module.exports = config;
