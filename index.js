const tiles = document.querySelectorAll('.tile')
const board = document.getElementById('board')
const playerX = "X";
const playerO ="O"
let turn = Math.random() > 0.5 ? 'X' : 'O';
const strike = document.getElementById("strikeThrough")
const lossMessage = document.getElementById("lossMessage");
const winnerMessage = document.getElementById("winnerMessage");
const playAgain = document.getElementById("playAgain");
let turnTeller = document.getElementById('turnTeller');
const twoPlayer = document.getElementById('twoPlayer');
// const onePlayer = document.getElementById('onePlayer');
const playerInfo = document.getElementById('playerInfo');


const gameState = Array(tiles.length);
gameState.fill(null);

// onePlayer.addEventListener('click', startGameVSComputer);

twoPlayer.addEventListener('click', startGameForTwo);

// function startGameVSComputer() {
//     playerInfo.className = 'hideStartScreen'
//     const player2Name = document.getElementById('oPlayer').value;
//     const player1Name = document.getElementById('xPlayer').value;
//          if (turn === playerX && player1Name != '') {
//             turnTeller.innerHTML = `${player1Name}'s turn`
//         }
//          if (turn === playerO && player2Name != '') {
//             turnTeller.innerHTML = `${player2Name}'s turn`
//         } else if (turn === playerO && player2Name === ''|| turn === playerX && player1Name === ''){
//             turnTeller.innerHTML = "computer's turn"
//         }
// }

function startGameForTwo() {
    const player1Name = document.getElementById('xPlayer').value;
    const player2Name = document.getElementById('oPlayer').value;
    playerInfo.className = 'hideStartScreen'
    if (turn === playerX) {
        turnTeller.innerHTML = `${player1Name}'s turn`
    } else if (turn === playerO){
        turnTeller.innerHTML = `${player2Name}'s turn`
    }
}


tiles.forEach((tile) => tile.addEventListener('click', tileClick));

// ORIGINALLLL
function tileClick(event) {
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    const player1Name = document.getElementById('xPlayer').value;
    const player2Name = document.getElementById('oPlayer').value;
    if (tile.innerHTML != ''){
        return;
    }
    if (turn === playerX && playerInfo.className === 'hideStartScreen') {
        tile.innerHTML = playerX;
        gameState[tileNumber-1] = playerX;
        turnTeller.innerHTML = `${player2Name}'s turn`
        turn = playerO;
    } else if (playerInfo.className === 'hideStartScreen'){
        tile.innerHTML = playerO;
        gameState[tileNumber-1] = playerO;
        turnTeller.innerHTML = `${player1Name}'s turn`
        turn = playerX;
    }
    checkForWinner();
}


const winningBoards = [
    {row: [1, 2, 3], strikeThru: 'strikeRow1'},
    {row: [4, 5, 6], strikeThru: 'strikeRow2'},
    {row: [7, 8, 9], strikeThru: 'strikeRow3'},
    {row: [1, 4, 7], strikeThru: 'strikeColumn1'},
    {row: [2, 5, 8], strikeThru: 'strikeColumn2'},
    {row: [3, 6, 9], strikeThru: 'strikeColumn3'},
    {row: [1, 5, 9], strikeThru: 'strikeDiagonal1'},
    {row: [3, 5, 7], strikeThru: 'strikeDiagonal2'},
]

const winningBoard = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]

function checkForWinner() {
    for(const winningBoard of winningBoards){
        const row = winningBoard.row;
        const strikeThru = winningBoard.strikeThru;
        const tileValue1 = gameState[row[0]-1];
        const tileValue2 = gameState[row[1]-1];
        const tileValue3 = gameState[row[2]-1];

        if(tileValue1 != null && tileValue1 === tileValue2  && tileValue1 === tileValue3) {
            strike.classList.add(strikeThru);
            endGameScreen(tileValue1);
            tiles.forEach((tile) => tile.removeEventListener('click', tileClick));
            return;
        }
    }
    const everyTileFull = gameState.every((tile) => tile !== null);
if (everyTileFull) {
    endGameScreen(null);
    winnerMessage.innerHTML = 'draw';
}
}

function endGameScreen(winnerValue){
    turnTeller.innerHTML =""
    if (winnerValue != null && winnerValue === playerO){
        const player2Name = document.getElementById('oPlayer').value;
        text =`Winner is ${player2Name}!`;
    } else {
        const player1Name = document.getElementById('xPlayer').value;
        text =`Winner is ${player1Name}!`;
    }
    lossMessage.className = 'showMessage';
    winnerMessage.innerHTML= text;
}
playAgain.addEventListener('click', startNewGame);
function startNewGame() {
    gameState.fill(null);
    tiles.forEach((tile) => tile.addEventListener('click', tileClick));
    strike.className = 'strike';
    lossMessage.className = 'hideMessage'
    tiles.forEach((tile) => (tile.innerHTML = ""))
    if (turn === playerX) {
        const player1Name = document.getElementById('xPlayer').value;
        turnTeller.innerHTML = `${player1Name}'s turn`
    } if (turn === playerO){
        const player2Name = document.getElementById('oPlayer').value;
        turnTeller.innerHTML = `${player2Name}'s turn`
    }
}
