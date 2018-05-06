/* eslint import/no-extraneous-dependencies: "off" */
const { DynamoDB } = require('aws-sdk');
const NestedError = require('nested-error-stacks');
const dynamoDbConfig = require('../config').aws.dynamodb;

const dynamoDB = new DynamoDB(dynamoDbConfig);

module.exports = {

  createGame: (gameName) => {

  },

  getAllActiveGames: async () => {
    try {
      const params = {
        ExpressionAttributeValues: {
          ':gameOver': { BOOL: false },
        },
        KeyConditionExpression: 'gameOver = %gameOver',
      };
      return await dynamoDB.query(params).promise();
    } catch (err) {
      throw new NestedError('Error while getting all active games', err);
    }
  },

  findGameById: (gameId) => {

  },

  updateGame: (game) => {

  }

};
