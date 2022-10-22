const tiles = document.querySelectorAll(".tile");
const board = document.getElementById("board");
const playerX = "X";
const playerO = "O";
let turn = Math.random() > 0.5 ? "X" : "O";
const strike = document.getElementById("strikeThrough");
const lossMessage = document.getElementById("lossMessage");
const winnerMessage = document.getElementById("winnerMessage");
const playAgain = document.getElementById("playAgain");
let turnTeller = document.getElementById("turnTeller");
const twoPlayer = document.getElementById("twoPlayer");
const onePlayer = document.getElementById("onePlayer");
const playerInfo = document.getElementById("playerInfo");

const gameState = Array(tiles.length);
gameState.fill(null);

onePlayer.addEventListener("click", startGameVSComputer);

twoPlayer.addEventListener("click", startGameForTwo);

const winningBoards = [
  { row: [1, 2, 3], strikeThru: "strikeRow1" },
  { row: [4, 5, 6], strikeThru: "strikeRow2" },
  { row: [7, 8, 9], strikeThru: "strikeRow3" },
  { row: [1, 4, 7], strikeThru: "strikeColumn1" },
  { row: [2, 5, 8], strikeThru: "strikeColumn2" },
  { row: [3, 6, 9], strikeThru: "strikeColumn3" },
  { row: [1, 5, 9], strikeThru: "strikeDiagonal1" },
  { row: [3, 5, 7], strikeThru: "strikeDiagonal2" },
];

const winningBoard = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// ------------- T W O PLAYERS FUNCTIONS --------------------
function tileClick(event) {
  let tile = event.target;
  let tileNumber = tile.dataset.index;
  const player1Name = document.getElementById("xPlayer").value;
  const player2Name = document.getElementById("oPlayer").value;
  if (tile.innerHTML != "") {
    return;
  }
  if (turn === playerX && playerInfo.className === "hideStartScreen") {
    tile.innerHTML = playerX;
    gameState[tileNumber - 1] = playerX;
    turnTeller.innerHTML = `${player2Name}'s turn`;
    turn = playerO;
  } else if (playerInfo.className === "hideStartScreen") {
    tile.innerHTML = playerO;
    gameState[tileNumber - 1] = playerO;
    turnTeller.innerHTML = `${player1Name}'s turn`;
    turn = playerX;
  }
  checkForWinner();
}

function checkForWinner() {
  for (const winningBoard of winningBoards) {
    const row = winningBoard.row;
    const strikeThru = winningBoard.strikeThru;
    const tileValue1 = gameState[row[0] - 1];
    const tileValue2 = gameState[row[1] - 1];
    const tileValue3 = gameState[row[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeThru);
      endGameScreen(tileValue1);
      tiles.forEach((tile) => tile.removeEventListener("click", tileClick));
      return;
    }
  }
  const everyTileFull = gameState.every((tile) => tile !== null);
  if (everyTileFull) {
    endGameScreen(null);
    winnerMessage.innerHTML = "draw";
  }
}
function endGameScreen(winnerValue) {
  turnTeller.innerHTML = "";
  if (winnerValue != null && winnerValue === playerO) {
    const player2Name = document.getElementById("oPlayer").value;
    text = `Winner is ${player2Name}!`;
  } else {
    const player1Name = document.getElementById("xPlayer").value;
    text = `Winner is ${player1Name}!`;
  }
  lossMessage.className = "showMessage";
  winnerMessage.innerHTML = text;
}

// -------------  MORE T W O PLAYERS FUNCTIONS --------------------
function startGameForTwo() {
  tiles.forEach((tile2) => tile2.addEventListener("click", tileClick));
  const player1Name = document.getElementById("xPlayer").value;
  const player2Name = document.getElementById("oPlayer").value;
  playerInfo.className = "hideStartScreen";
  if (turn === playerX) {
    turnTeller.innerHTML = `${player1Name}'s turn`;
  } else if (turn === playerO) {
    turnTeller.innerHTML = `${player2Name}'s turn`;
  }

  playAgain.addEventListener("click", startNewGame);
  function startNewGame() {
    gameState.fill(null);
    tiles.forEach((tile) => tile.addEventListener("click", tileClick));
    strike.className = "strike";
    lossMessage.className = "hideMessage";
    tiles.forEach((tile) => (tile.innerHTML = ""));
    if (turn === playerX) {
      const player1Name = document.getElementById("xPlayer").value;
      turnTeller.innerHTML = `${player1Name}'s turn`;
    }
    if (turn === playerO) {
      const player2Name = document.getElementById("oPlayer").value;
      turnTeller.innerHTML = `${player2Name}'s turn`;
    }
  }
}

// ------------- O N E PLAYER FUNCTIONS --------------------
function startGameVSComputer() {
  playerInfo.className = "hideStartScreen";
  tiles.forEach((tile) => tile.addEventListener("click", onePlayerTileClick));
  const player1Name = document.getElementById("xPlayer").value;
  const player2Name = "computer";
  if (turn === playerX) {
    turnTeller.innerHTML = `${player1Name}'s turn`;
    if (turn === playerO) {
      turnTeller.innerHTML = player2Name + "'s turn";
    }
  }
}

function onePlayerTileClick(event) {
  const tile = event.target;
  let tileNumber = tile.dataset.index;
  const player2Name = "computer";
  if (tile.innerHTML != "") {
    return;
  }
  if (turn === playerX && playerInfo.className === "hideStartScreen") {
    tile.innerHTML = playerX;
    gameState[tileNumber - 1] = playerX;
    turnTeller.innerHTML = player2Name + "'s turn";
    turn = playerO;
    checkForWinnerComputer();
  } else if (turn === playerO && playerInfo.className === "hideStartScreen") {
    computerMove();
    gameState[tileNumber - 1] = playerO;
  }
}

function computerMove() {
  let tile = tiles;
  let randomSpot = Math.floor(Math.random() * tile.length);
  console.log(randomSpot);
  const player1Name = document.getElementById("xPlayer").value;
  turn = playerX;
  console.log(tile[randomSpot]);
  if (
    tile[randomSpot].innerHTML === "X" ||
    tile[randomSpot].innerHTML === "O"
  ) {
    computerMove();
  } else {
    tile[randomSpot].innerHTML = playerO;
    turnTeller.innerHTML = `${player1Name}'s turn`;
  }
  checkForWinnerComputer();
}
function checkForWinnerComputer() {
  for (const winningBoard of winningBoards) {
    const row = winningBoard.row;
    const strikeThru = winningBoard.strikeThru;
    const tileValue1 = gameState[row[0] - 1];
    const tileValue2 = gameState[row[1] - 1];
    const tileValue3 = gameState[row[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeThru);
      endGameScreenComputer(tileValue1);
      tiles.forEach((tile) =>
        tile.removeEventListener("click", onePlayerTileClick)
      );
      return;
    }
  }
  const everyTileFull = gameState.every((tile) => tile !== null);
  if (everyTileFull) {
    endGameScreenComputer(null);
    winnerMessage.innerHTML = "draw";
  }
}
function endGameScreenComputer(winnerValue) {
  turnTeller.innerHTML = "";
  console.log(winnerValue);
  if (winnerValue != null && winnerValue === playerX) {
    const player1Name = document.getElementById("xPlayer").value;
    text = `Winner is ${player1Name}!`;
  } else {
    text = "Winner is computer!";
  }
  lossMessage.className = "showMessage";
  winnerMessage.innerHTML = text;
}
playAgain.addEventListener("click", startNewGame);
function startNewGame() {
  gameState.fill(null);
  strike.className = "strike";
  lossMessage.className = "hideMessage";
  tiles.forEach((tile2) => (tile2.innerHTML = ""));
  tiles.forEach((tile2) => tile2.addEventListener("click", onePlayerTileClick));
  if (turn === playerX) {
    const player1Name = document.getElementById("xPlayer").value;
    turnTeller.innerHTML = `${player1Name}'s turn`;
  }
  if (turn === playerO) {
    const player2Name = "computer";
    turnTeller.innerHTML = player2Name + "'s turn";
  }
}
