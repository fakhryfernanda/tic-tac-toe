const ticTacToe = document.querySelector('.tic-tac-toe');
const gameBoard = ticTacToe.querySelector('[data-game-board]');
const tiles = ticTacToe.querySelectorAll('[data-tile]');
const startButton = ticTacToe.querySelector('[data-button="start"]');
const restartButton = ticTacToe.querySelector('[data-button="restart"]');

// Start the game

startButton.addEventListener('click', () => {
    gameBoard.style.filter = 'blur(0)';
    ticTacToe.setAttribute('game-start', 'true');
});

// Human always go first
let human = new Player('Human');
let computer = new Player('Computer');

let count = 1;
tiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
        if (ticTacToe.getAttribute('game-start') === 'true') {
            if (tile.getAttribute('data-filled') === 'false') {
                if (count % 2 === 1) {
                    tile.innerHTML = '<i class="fa-solid fa-xmark">';
                } else {
                    tile.innerHTML = '<i class="fa-solid fa-circle">';
                };
    
                tile.setAttribute('data-filled', 'true');
                writeAnswer(tile);
                count += 1;
    
                winCheck();
            };
        };
    });
});

restartButton.addEventListener('click', () => {
    resetTiles();
    human.answer = [];
    computer.answer = [];
});

// FUNCTIONS

function Player(name) {
    this.name = name;
    this.answer = [];
};

function writeAnswer(tile) {
    if (count % 2 === 1) {
        human.answer.push(tile.getAttribute('data-tile'));
    } else {
        computer.answer.push(tile.getAttribute('data-tile'));
    };
    
};

function resetTiles() {
    tiles.forEach(tile => {
        tile.innerHTML = '';
        tile.setAttribute('data-filled', 'false');
    })
};

function winCheck() {
    const win = ['123', '456', '789', '147', '258', '369', '159', '357'];
    win.some(condition => {
        if (subArrayCheck(human.answer, condition.split(''))) {
            console.log('Human wins!');
            ticTacToe.setAttribute('game-start', 'false'); // stop the game
            gameBoard.style.filter = 'blur(5px)';
            return true; // stop checking
        };

        if (subArrayCheck(computer.answer, condition.split(''))) {
            console.log('Computer wins!');
            ticTacToe.setAttribute('game-start', 'false'); // stop the game
            gameBoard.style.filter = 'blur(5px)';
            return true; // stop checking
        };
    });
};

function subArrayCheck(arr1, arr2) {
    // check if arr1 contains arr2
    // arr1.length >= arr2.length
    return arr2.every(element => arr1.indexOf(element) !== -1);
};