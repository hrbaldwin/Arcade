let grid = document.getElementsByClassName('grid');
let lossMessage = document.getElementsByClassName('lossMessage');
let playAgain = document.getElementsByClassName('playAgain');
let scoreDisplay = document.getElementsByClassName('scoreDisplay');

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10,8]],
    nextDirection: [1, 0]
}

let gameState = {
    apple: [11, 8],
    snake: snake
}
function createBoard() {
    lossMessage.style.display = "none";
    for (let i = 0; i < 100; i++) {
        let div = document.createElement('div');
        grid.appendChild(div);
    }
}


document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('keyup', control);
    createBoard();
    startGame();
    playAgain.addEventListener('click', replay)
})

