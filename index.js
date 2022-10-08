const tiles = document.querySelectorAll('.tile')
const board = document.getElementById('board')
const playerX = "X";
const playerO ="O"
let turn = playerX;
const strike = document.getElementById("strikeThrough")
const lossMessage = document.getElementById("lossMessage");
const winnerMessage = document.getElementById("winnerMessage");
const playAgain = document.getElementById("playAgain");
let xPlayer = document.getElementById('xPlayer');
let oPlayer = document.getElementById('oPlayer');
let turnTeller = document.getElementById('turnTeller');

const gameState = Array(tiles.length);
gameState.fill(null);




tiles.forEach((tile) => tile.addEventListener('click', tileClick));


function tileClick(event) {
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerHTML != ''){
        return;
    }
    if (turn === playerX) {
        tile.innerHTML = playerX;
        gameState[tileNumber-1] = playerX;
        turn = playerO;
    } else {
        tile.innerHTML = playerO;
        gameState[tileNumber-1] = playerO;
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
            endGame(tileValue1);
            return;
        }
    }
    const everyTileFull = gameState.every((tile) => tile !== null);
if (everyTileFull) {
    endGame(null);
}
}

function endGame(winnerValue){
    let text = 'draw';
    if (winnerValue != null){
        text =`Winner is ${winnerValue}!`;
    }
    lossMessage.className = 'showMessage';
    winnerMessage.innerHTML= text;
}
playAgain.addEventListener('click', startNewGame);
function startNewGame() {
    gameState.fill(null);
    strike.className = 'strike';
    lossMessage.className = 'hideMessage'
    tiles.forEach((tile) => (tile.innerHTML = ""))
    turn = playerX
}
