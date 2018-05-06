/* eslint import/no-extraneous-dependencies: "off" */
const { DynamoDB } = require('aws-sdk');
const NestedError = require('nested-error-stacks');
const dynamoDbConfig = require('../config').aws.dynamodb;

const dynamoDB = new DynamoDB(dynamoDbConfig);

const gameDao = {

  createTableIfNotExists: async () => {
    console.log('Creating \'games\' table...');
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
      console.log('Table successfully created!');
      return;
    } catch (err) {
      if (err.code === 'ResourceInUseException' && err.message === 'Cannot create preexisting table') {
        console.log('Table already exists');
      } else {
        throw new NestedError('Unable to create \'games\' table.', err);
      }
    }
  },

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
      await gameDao.createTableIfNotExists();
      const params = {
        TableName: 'games',
        FilterExpression: 'gameOver = :gameOver',
        ExpressionAttributeValues: {
          ':gameOver': { BOOL: false },
        },
      };
      return await dynamoDB.scan(params).promise();
    } catch (err) {
      throw new NestedError('Error while getting all active games', err);
    }
  },

  findGameById: (gameId) => {

  },

  updateGame: (game) => {

  },

};

module.exports = gameDao;
