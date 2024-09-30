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

  const updateSquare = (marker) => {
    let square = getUserInput();

    while (!validSquare(row, col)) {
      alert("Invalid square - try again.")
      square = getUserInput();
    }

    squares[square] = marker;
  }

  const getUserInput = () => {
    return parseInt(prompt("Please enter a square (1-9): ")) - 1;
  }

  const validSquare = (row) => {
    return squares[row] !== undefined && squares[row] === null
  }

  return { getSquares, diagonals, rows, columns, updateSquare }
})();

const game = (function (board) {
  const players = [createPlayer('X'), createPlayer('O')];
  let currentPlayer = players[0];
  let winner = null;

  const updateCurrentPlayer = () => currentPlayer = currentPlayer.getMarker() === 'X' ? players[1] : players[0];

  const play = () => {
    while (winner === null) {
      board.updateSquare(currentPlayer.getMarker());
      if (isGameOver()) { break; }
      updateCurrentPlayer();
    }

    alert(`Game over - ${winner} wins!`);
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

  return { play }
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

      gameboard.appendChild(squareElement);
    }
  };

  return { renderBoard };
})(game, board);

displayController.renderBoard();