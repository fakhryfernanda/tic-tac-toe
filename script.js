const gameBoard = document.querySelector('[data-gameBoard]');
const tiles = gameBoard.querySelectorAll('[data-tile]');
const restartButton = document.querySelector('.restart-button');

// Human always go first
let human = new Player('Human');
let computer = new Player('Computer');

let count = 1;
tiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
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
            return true; // stop checking
        };

        if (subArrayCheck(computer.answer, condition.split(''))) {
            console.log('Computer wins!');
            return true; // stop checking
        };
    });
};

function subArrayCheck(arr1, arr2) {
    // check if arr1 contains arr2
    // arr1.length >= arr2.length
    return arr2.every(element => arr1.indexOf(element) !== -1);
};