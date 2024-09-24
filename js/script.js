function createBoard() {
  let board = Array(3).fill(" ").map(() => Array(3).fill(" "));

  const updateBoard = (marker, cell) => board[cell] = marker;
  const showBoard = () => printBoard(board);

  return { board, updateBoard, showBoard };
}

function printBoard(board) {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i].join(' | '));
    if (i < board.length - 1) {
      console.log("---------");
    }
  }
}