function createBoard() {
  let board = Array(3).fill(" ").map(() => Array(3).fill(" "));
  let winner = null;
  const diagonals = [[board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]]];
  const rows = [board[0], board[1], board[2]];
  const columns = [[board[0][0], board[1][0], board[2][0]], [board[0][1], board[1][1], board[2][1]], [board[0][2], board[1][2], board[2][2]]];
  const winConditions = [diagonals, columns, rows];

  const checkForWinner = () => {
    winConditions.forEach(direction => {
      direction.forEach(condition => {
        if (condition.every(square => square === 'X')) {
          winner = 'X';
          return;
        }
        else if (condition.every(square => square === 'O')) {
          winner = 'O';
          return;
        }
      });
    });
  };

  const updateSquare = (marker, square) => {
    const row = Math.floor((square / 3));
    col = square % 3;

    board[row][col] = marker;
  };
  const show = () => {
    for (let i = 0; i < board.length; i++) {
      console.log(board[i].join(' | '));
      if (i < board.length - 1) {
        console.log("---------");
      }
    }
  };

  return { winner, checkForWinner, updateSquare, show };
}

function createPlayer(marker) {
  const playerMarker = marker

  return { playerMarker };
}

function createGame(board, playerArr) {
  const players = playerArr;
  let gameBoard = board;
  let currentPlayer = players[0];

  const updateCurrentPlayer = () => currentPlayer = currentPlayer.playerMarker === 'X' ? players[1] : players[0];
  const playGame = () => {
    while (gameBoard.winner === null) {
      gameBoard.show();
      let square = parseInt(prompt("pick a square to place your marker in (1-9): "));
      gameBoard.updateSquare(currentPlayer.playerMarker, square - 1);
      gameBoard.checkForWinner();
      console.log(currentPlayer);
      updateCurrentPlayer();
      console.log(currentPlayer);
    }
    gameBoard.show();
    alert(`Game over - ${gameBoard.winner}'s win!`);
  }

  return { updateCurrentPlayer, currentPlayer, playGame };
}

const board = createBoard();
const player1 = createPlayer('X');
const player2 = createPlayer('O');
const game = createGame(board, [player1, player2]);