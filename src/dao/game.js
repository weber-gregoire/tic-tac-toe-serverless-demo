/* eslint import/no-extraneous-dependencies: "off" */
const { DynamoDB } = require('aws-sdk');
const NestedError = require('nested-error-stacks');
const dynamoDbConfig = require('../config').aws.dynamodb;

const dynamoDB = new DynamoDB(dynamoDbConfig);

module.exports = {

  createGame: async (initialGame) => {
    try {
      const params = {
        ExpressionAttributeNames: {
          '#G': 'grid',
          '#LP': 'lastPlayer',
          '#W': 'winner',
          '#GO': 'gameOver',
        },
        ExpressionAttributeValues: {
          ':g': {
            S: JSON.stringify(initialGame.grid),
          },
          ':lp': {
            S: initialGame.lastPlayer,
          },
          ':w': {
            S: initialGame.winner,
          },
          ':go': {
            BOOL: initialGame.gaomeOver,
          },
        },
        Key: {
          id: {
            S: initialGame.id,
          },
        },
        ReturnValues: 'ALL_NEW',
        TableName: 'games',
        UpdateExpression: 'SET #G = :g, #LP = :lp, #W = :w, #GO = :go',
      };
      return await dynamoDB.updateItem(params).promise();
    } catch (err) {
      throw new NestedError('Error while creating new game', err);
    }
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

  },

};
