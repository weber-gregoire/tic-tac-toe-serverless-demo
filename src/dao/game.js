/* eslint import/no-extraneous-dependencies: "off" */
const { DynamoDB } = require('aws-sdk');
const NestedError = require('nested-error-stacks');
const logger = require('../utils/logger');
const dynamoDbConfig = require('../config').aws.dynamodb;
const { TicTacToe } = require('../models/tic-tac-toe');

const dynamoDB = new DynamoDB(dynamoDbConfig);
const documentClient = new DynamoDB.DocumentClient({ service: dynamoDB });

const gameDao = {

  createTableIfNotExists: async () => {
    logger.info('Creating \'games\' table...');
    try {
      const params = {
        TableName: 'games',
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' },
        ],
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      };
      await dynamoDB.createTable(params).promise();
      logger.info('Table successfully created!');
    } catch (err) {
      if (err.code === 'ResourceInUseException' && err.message === 'Cannot create preexisting table') {
        logger.info('Table already exists');
      } else {
        logger.error(err);
        throw new NestedError('Unable to create \'games\' table.', err);
      }
    }
  },

  createGame: async (initialGame) => {
    try {
      await gameDao.createTableIfNotExists();
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
      await gameDao.createTableIfNotExists();
      const params = {
        TableName: 'games',
        FilterExpression: 'gameOver = :gameOver',
        ExpressionAttributeValues: {
          ':gameOver': false,
        },
      };
      const gamesData = await documentClient.scan(params).promise();
      return gamesData.Items.map(game => new TicTacToe(game));
    } catch (err) {
      throw new NestedError('Error while getting all active games', err);
    }
  },

  findGameById: async (gameId) => {
    try {
      await gameDao.createTableIfNotExists();
      const params = {
        TableName: 'games',
        Key: {
          id: gameId,
        },
      };
      const gameData = (await documentClient.get(params).promise()).Item;
      return new TicTacToe(gameData);
    } catch (err) {
      throw new NestedError(`Error while getting game ${gameId}`, err);
    }
  },

  updateGame: async (game) => {
    try {
      await gameDao.createTableIfNotExists();
      const params = {
        TableName: 'games',
        Key: { id: game.id },
        Item: game,
      };
      return await documentClient.update(params).promise();
    } catch (err) {
      throw new NestedError('Error while creating new game', err);
    }
  },

};

module.exports = gameDao;
