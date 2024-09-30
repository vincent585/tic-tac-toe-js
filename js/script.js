function createPlayer(marker) {
  const getMarker = () => marker;

  return { getMarker };
}

const board = (function () {
  let squares = Array(9).fill(null);

  const getSquares = () => squares;

  const diagonals = () => [
    [squares[0], squares[4], squares[8]],
    [squares[2], squares[4], squares[6]]
  ];
  const rows = () => [
    [squares[0], squares[1], squares[2]],
    [squares[3], squares[4], squares[5]],
    [squares[6], squares[7], squares[8]]
  ];
  const columns = () => [
    [squares[0], squares[3], squares[6]],
    [squares[1], squares[4], squares[7]],
    [squares[2], squares[5], squares[8]]
  ];

  const updateSquare = (square, marker) => {
    squares[square] = marker;
  }

  const validSquare = (square) => {
    return squares[square] !== undefined && squares[square] === null
  }

  return { getSquares, diagonals, rows, columns, updateSquare, validSquare }
})();

const game = (function (board) {
  const players = [createPlayer('X'), createPlayer('O')];
  let currentPlayer = players[0];
  let winner = null;

  const getCurrentPlayer = () => currentPlayer.getMarker();
  const updateCurrentPlayer = () => currentPlayer = currentPlayer.getMarker() === 'X' ? players[1] : players[0];

  const playTurn = (square) => {
    board.updateSquare(square, currentPlayer.getMarker());

    if (isGameOver()) {
      alert(`Game over - ${winner} wins!`);
      return;
    }

    updateCurrentPlayer();
  };

  const isGameOver = () => {
    if (hasWinner()) {
      winner = currentPlayer.getMarker();
      return true;
    }
    else if (isTie()) {
      winner = "No one";
      return true;
    }

    return false;
  }

  const isTie = () => {
    return (board.getSquares().every(square => square !== null));
  }

  const hasWinner = () => {
    const winConditions = [...board.rows(), ...board.columns(), ...board.diagonals()];

    for (const condition of winConditions) {
      if (condition.every(square => square === 'X')) {
        return true;
      }
      else if (condition.every(square => square === 'O')) {
        return true;
      }
    };

    return false;
  };

  return { playTurn, getCurrentPlayer }
})(board);

const displayController = (function (game, board) {
  const gameboard = document.querySelector('.gameboard');

  const renderBoard = () => {
    const squares = board.getSquares();

    for (let index = 0; index < squares.length; index++) {
      const square = squares[index];
      let squareElement = document.createElement('button');
      squareElement.innerText = square;
      squareElement.setAttribute('data-index', index);
      squareElement.classList.add('square');
      squareElement.addEventListener('click', (event) => updateGameboard(event));

      gameboard.appendChild(squareElement);
    }

    const updateGameboard = (event) => {
      const square = parseInt(event.target.dataset.index);
      const player = game.getCurrentPlayer();

      if (!board.validSquare(square)) {
        alert("Invalid square - try again");
        return;
      }

      let squareToUpdate = gameboard.querySelector(`button[data-index="${square}"]`);
      squareToUpdate.innerText = player;
      game.playTurn(square);
    }
  };



  return { renderBoard };
})(game, board);

displayController.renderBoard();