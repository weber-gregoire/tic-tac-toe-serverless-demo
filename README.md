# Serverless Tic Tac Toe
Simple Tic Tac Toe application used to show what can be done with serverless framework.\
This app was created to be used as a live demo during a DevOps meetup.\
The presentation can be found [here on slideshare][0]

## Setup
`npm install`
then
`sls dynamodb install`

## API Documentation
Base url : `localhost:3000`
### List games
url : `/games`\
method: `GET`\
response :
```
[
    { "id": "0723a8ec-3f76-4b67-b4d4-c202e72b901f" },
    { "id": "8e85d30c-bb90-41d5-b346-a6e5baf9acbb" },
    { "id": "50a754eb-9aea-422f-9e29-5dcb41352036" }
]
```
### Create game
url : `/games`\
method: `POST`\
response :
```
{
    "id": "76b2db2a-2d8f-4d66-9cc2-47a92bc1a125",
    "grid": [
        [ "-", "-", "-" ],
        [ "-", "-", "-" ],
        [ "-", "-", "-" ]
    ],
    "lastPlayer": "O",
    "gameOver": false
}
```
### Get game state
url : `/games/{gameId}`\
method: `GET`\
response :
```
{
    "id": "76b2db2a-2d8f-4d66-9cc2-47a92bc1a125",
    "grid": [
        [ "X", "-", "-" ],
        [ "-", "O", "-" ],
        [ "X", "-", "-" ]
    ],
    "lastPlayer": "X",
    "gameOver": false
}
```
### Play a move
url : `/games/{gameId}`\
method: `GET`\
payload:
```
{
  "playerSymbol": "X", // Can be 'O' or 'X'
  "coordinates": { "x": 1, "y": 2 }
}
```
response :
```
{
    "id": "76b2db2a-2d8f-4d66-9cc2-47a92bc1a125",
    "grid": [
        [ "X", "-", "-" ],
        [ "-", "O", "-" ],
        [ "X", "-", "-" ]
    ],
    "lastPlayer": "X",
    "gameOver": false
}
```

[0]: https://www.slideshare.net/bargenson/serverless-applications-96528705/bargenson/serverless-applications-96528705