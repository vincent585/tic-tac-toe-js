function createPlayer(name, marker) {
  const getMarker = () => marker;
  const getName = () => name;

  return { getMarker, getName };
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
  let players = [];
  let currentPlayer = null;
  let winner = null;

  const getCurrentPlayer = () => currentPlayer;
  const updateCurrentPlayer = (player = null) => {
    if (player !== null) {
      currentPlayer = player;
    }
    else {
      currentPlayer = players.find(p => p !== currentPlayer);
    }
  }

  const setPlayers = (playerArray) => players = playerArray;

  const playTurn = (square) => {
    board.updateSquare(square, currentPlayer);

    if (isGameOver()) {
      // TODO - Change to display in DOM
      alert(`Game over - ${winner} wins!`);
      return;
    }

    updateCurrentPlayer();
  };

  const isGameOver = () => {
    if (hasWinner()) {
      winner = currentPlayer.getName();
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

  return { playTurn, getCurrentPlayer, setPlayers, updateCurrentPlayer }
})(board);

const displayController = (function (game, board) {
  const gameboard = document.querySelector('.gameboard');
  const setupModal = document.querySelector('dialog');
  const form = document.querySelector('dialog form');
  const startBtn = document.querySelector('#start');
  const resetFormBtn = document.querySelector('#reset-form');
  const playerOneMarker = document.getElementsByName('player-one-marker');
  const playerTwoMarker = document.getElementsByName('player-two-marker');

  startBtn.addEventListener('click', (event) => {
    event.preventDefault();

    let formData = new FormData(form);
    if (!validateForm(formData)) {
      return;
    }

    let players = [
      createPlayer(formData.get("player-one-name"), formData.get("player-one-marker")),
      createPlayer(formData.get("player-two-name"), formData.get("player-two-marker"))
    ];

    game.setPlayers(players);
    game.updateCurrentPlayer(players.find(p => p.getMarker() === 'X'));
    form.reset();
    setupModal.close();
    renderBoard();
  });

  resetFormBtn.addEventListener('click', () => {
    form.reset();
  });

  const validateForm = (formToValidate) => {
    const playerOneChecked = [...playerOneMarker].find(x => x.checked);
    const playerTwoChecked = [...playerTwoMarker].find(x => x.checked);
    const playerOneName = document.querySelector('#player-one-name');
    const playerTwoName = document.querySelector('#player-two-name');

    if (formToValidate.get("player-one-marker") === formToValidate.get("player-two-marker")) {
      playerOneChecked.setCustomValidity("* Cannot have the same marker");
      playerOneChecked.reportValidity();
      playerTwoChecked.setCustomValidity("* Cannot have the same marker");
      playerTwoChecked.reportValidity();

      return false;
    }

    if (formToValidate.get("player-one-name").trim().length === 0) {

      playerOneName.setCustomValidity("* Name cannot be empty");
      playerOneName.reportValidity();

      return false;
    }

    if (formToValidate.get("player-two-name").trim().length === 0) {
      playerTwoName.setCustomValidity("* Name cannot be empty");
      playerTwoName.reportValidity();

      return false;
    }

    playerOneChecked.setCustomValidity("");
    playerTwoChecked.setCustomValidity("");
    playerOneName.setCustomValidity("");
    playerTwoName.setCustomValidity("");

    return true;
  }

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
      squareToUpdate.innerText = player.getMarker();
      game.playTurn(square);
    }
  };

  const playerSetup = () => {
    setupModal.showModal();
  }



  return { renderBoard, playerSetup };
})(game, board);

displayController.playerSetup();