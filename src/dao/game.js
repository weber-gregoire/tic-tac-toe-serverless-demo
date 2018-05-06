/* eslint import/no-extraneous-dependencies: "off" */
const { DynamoDB } = require('aws-sdk');
const NestedError = require('nested-error-stacks');
const logger = require('../utils/logger');
const dynamoDbConfig = require('../config').aws.dynamodb;

const dynamoDB = new DynamoDB(dynamoDbConfig);
const documentClient = new DynamoDB.DocumentClient({ service: dynamoDB });

const gameDao = {

  createGame: async (initialGame) => {
    try {
      const params = {
        TableName: 'games',
        Item: initialGame,
      };
      await documentClient.put(params).promise();
      return initialGame;
    } catch (err) {
      throw new NestedError('Error while creating new game', err);
    }
  },

  getAllGames: async () => {
    try {
      const params = {
        TableName: 'games',
        FilterExpression: 'gameOver = :gameOver',
        ExpressionAttributeValues: {
          ':gameOver': false,
        },
        ProjectionExpression: 'id',
      };
      return await documentClient.scan(params).promise();
    } catch (err) {
      throw new NestedError('Error while getting all games', err);
    }
  },

  findGameById: async (gameId) => {
    try {
      const params = {
        TableName: 'games',
        Key: {
          id: gameId,
        },
      };
      return (await documentClient.get(params).promise()).Item;
    } catch (err) {
      throw new NestedError(`Error while getting game ${gameId}`, err);
    }
  },

  updateGame: (game) => {

  },

};

module.exports = gameDao;
