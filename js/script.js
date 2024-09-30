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

  const show = () => {
    for (let i = 0; i < squares.length; i++) {
      console.log(squares[i].join(" | "));
      if (i < squares.length - 1) {
        console.log("---------")
      }
    }
    console.log("");
  }

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

  return { getSquares, diagonals, rows, columns, show, updateSquare }
})();

const game = (function (board) {
  const players = [createPlayer('X'), createPlayer('O')];
  let currentPlayer = players[0];
  let winner = null;

  const updateCurrentPlayer = () => currentPlayer = currentPlayer.getMarker() === 'X' ? players[1] : players[0];

  const play = () => {
    while (winner === null) {
      board.show();
      board.updateSquare(currentPlayer.getMarker());
      if (isGameOver()) { break; }
      updateCurrentPlayer();
    }

    board.show();
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