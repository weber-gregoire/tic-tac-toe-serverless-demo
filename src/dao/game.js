/* eslint import/no-extraneous-dependencies: "off" */
const { DynamoDB } = require('aws-sdk');
const NestedError = require('nested-error-stacks');
const dynamoDbConfig = require('../config').aws.dynamodb;
const { TicTacToe } = require('../models/tic-tac-toe');

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
      const gamesData = await documentClient.scan(params).promise();
      return gamesData.Items.map(game => new TicTacToe(game));
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
      const gameData = (await documentClient.get(params).promise()).Item;
      return new TicTacToe(gameData);
    } catch (err) {
      throw new NestedError(`Error while getting game ${gameId}`, err);
    }
  },

  updateGame: async (game) => {
    const gameData = game.toJSON();
    try {
      const params = {
        TableName: 'games',
        Key: { id: game.id },
        UpdateExpression: 'set grid=:g, lastPlayer=:lp, winner=:w, gameOver=:go',
        ExpressionAttributeValues: {
          ':g': gameData.grid,
          ':lp': gameData.lastPlayer,
          ':w': gameData.winner,
          ':go': gameData.gameOver,
        },
        ReturnValues: 'ALL_NEW',
      };
      return await documentClient.update(params).promise();
    } catch (err) {
      throw new NestedError('Error while creating new game', err);
    }
  },

};

module.exports = gameDao;
