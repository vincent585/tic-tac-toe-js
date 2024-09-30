function createPlayer(marker) {
  const getMarker = () => marker;

  return { getMarker };
}

const board = (function () {
  let squares = Array(3).fill(" ").map(() => Array(3).fill(" "));

  const getSquares = () => squares;

  const diagonals = () => [
    [squares[0][0], squares[1][1], squares[2][2]],
    [squares[0][2], squares[1][1], squares][2][0]]
  const rows = () => [squares[0], squares[1], squares[2]]
  const columns = () => [
    [squares[0][0], squares[1][0], squares[2][0]],
    [squares[0][1], squares[1][1], squares[2][1]],
    [squares[0][2], squares[1][2], squares[2][2]]]

  const updateSquare = (marker) => {
    let square = getUserInput();
    let [row, col] = getRowAndCol(square);

    while (!validSquare(row, col)) {
      alert("Invalid square - try again.")
      square = getUserInput();
      [row, col] = getRowAndCol(square);
    }

    squares[row][col] = marker;
  }

  const getUserInput = () => {
    return parseInt(prompt("Please enter a square (1-9): ")) - 1;
  }

  const getRowAndCol = (square) => { return [Math.floor((square / 3)), square % 3] }

  const validSquare = (row, col) => {
    return squares[row] !== undefined && squares[row][col] === " "
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
    return (board.getSquares().flat().every(square => square !== " "));
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
    let squares = board.getSquares().flat();
    for (const square of squares) {
      let squareElement = document.createElement('button');
      squareElement.innerText = square;
      squareElement.setAttribute('data-index', squares.indexOf(square));
      squareElement.classList.add('square');

      gameboard.appendChild(squareElement);
    }
  };

  return { renderBoard };
})(game, board);