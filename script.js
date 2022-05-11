const gameBoard = document.querySelector('[data-gameBoard]');
const tiles = gameBoard.querySelectorAll('[data-tile]');
const clearButton = document.querySelector('.clear-button');

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
        };
    });
});

clearButton.addEventListener('click', () => {
    resetTiles();
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
        tile.setAttribute('data-tile', '');
    })
};