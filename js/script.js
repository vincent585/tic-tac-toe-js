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
  }

  const updateSquare = (square, marker) => {
    let [row, col] = getRowAndCol(square);

    while (!validSquare(row, col)) {
      alert("That square is already filled! Try again.")
      let newSquare = parseInt(prompt("Enter a new square: "));
      [row, col] = getRowAndCol(newSquare);
    }

    squares[row][col] = marker;
  }

  const getRowAndCol = (square) => { return [Math.floor((square / 3)), square % 3] }

  const validSquare = (row, col) => {
    return squares[row][col] === " ";
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
      let square = parseInt(prompt("Enter the square you want to place your marker in: "));
      board.updateSquare(square, currentPlayer.getMarker());
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



// function createBoard() {
//   let board = Array(3).fill(" ").map(() => Array(3).fill(" "));
//   let winner = null;

//   const diagonals = () => [[board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]]];
//   const rows = () => [board[0], board[1], board[2]];
//   const columns = () => [[board[0][0], board[1][0], board[2][0]], [board[0][1], board[1][1], board[2][1]], [board[0][2], board[1][2], board[2][2]]];
//   const winConditions = () => [...diagonals(), ...columns(), ...rows()];

//   const checkForWinner = () => {
//     for (const condition of winConditions()) {
//       if (condition.every(square => square === "X")) {
//         winner = "X";
//         break;
//       }
//       else if (condition.every(square => square === "O")) {
//         winner = "O";
//         break;
//       }
//     }
//   };

//   const getWinner = () => winner;

//   const updateSquare = (marker, square) => {
//     const row = Math.floor((square / 3));
//     col = square % 3;

//     if (board[row][col] != " ") {
//       alert("that square has already been played!");
//     }

//     board[row][col] = marker;
//   };
//   const show = () => {
//     for (let i = 0; i < board.length; i++) {
//       console.log(board[i].join(' | '));
//       if (i < board.length - 1) {
//         console.log("---------");
//       }
//     }
//   };

//   return { getWinner, checkForWinner, updateSquare, show };
// }

// function createPlayer(marker) {
//   const playerMarker = marker

//   return { playerMarker };
// }

// function createGame(board, playerArr) {
//   const players = playerArr;
//   let gameBoard = board;
//   let currentPlayer = players[0];

//   const updateCurrentPlayer = () => currentPlayer = currentPlayer.playerMarker === 'X' ? players[1] : players[0];
//   const playGame = () => {
//     while (gameBoard.getWinner() === null) {
//       gameBoard.show();
//       let square = parseInt(prompt("pick a square to place your marker in (1-9): "));
//       gameBoard.updateSquare(currentPlayer.playerMarker, square - 1);
//       gameBoard.checkForWinner();
//       updateCurrentPlayer();
//     }
//     gameBoard.show();
//     alert(`Game over - ${gameBoard.getWinner()}'s win!`);
//   }

//   return { playGame };
// }

// const board = createBoard();
// const player1 = createPlayer('X');
// const player2 = createPlayer('O');
// const game = createGame(board, [player1, player2]);