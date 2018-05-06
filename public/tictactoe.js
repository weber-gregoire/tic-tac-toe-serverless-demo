window.onload = function () {

  const BASE_URL = 'http://localhost:3000';
  let currentGameId;
  let currentSymbol;

  function setCurrentGame(gameId) {
    const container = document.getElementById('current-game');
    container.innerHTML = `
      <div id="tic-tac-toe">
        <table>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td> 
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>`;
  }

  function displayGameList(games) {
    const container = document.getElementById('games-list');
    container.innerHTML = '<ul>' + games.map((game) => {
      return `<li><a href="#" data-game-id={$game.id}>${game.id}</a></li>`;
    }) + '</ul>';
  }

  function createNewGame() {
    fetch(`${BASE_URL}/games`, { method: 'POST' })
      .then((response) => {
        return response.json();
      })
      .then((newGame) => {
        setCurrentGame(newGame.id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function updateGameList() {
    fetch(`${BASE_URL}/games`)
      .then((response) => {
        return response.json();
      }).then((games) => {
        displayGameList(games);
      }).catch((err) => {
        console.error(err);
      });
  }

  function updateCurrentGameStatus() {
    console.log('updateCurrentGameStatus');
  }

  const createGameButton = document.getElementById('create-new-game');
  createGameButton.addEventListener('click', createNewGame);

  window.setInterval(updateGameList, 500);
  // window.setInterval(updateCurrentGameStatus, 250);
};