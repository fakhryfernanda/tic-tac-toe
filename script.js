const ticTacToe = document.querySelector('.tic-tac-toe');
const gameBoard = ticTacToe.querySelector('[data-game-board]');
const tiles = ticTacToe.querySelectorAll('[data-tile]');
const startButton = ticTacToe.querySelector('[data-button="start"]');
const restartButton = ticTacToe.querySelector('[data-button="restart"]');
const modal = ticTacToe.querySelector('.modal');

// Human always go first
let human;
let computer;
let count;

// Start the game

startButton.addEventListener('click', () => {
    gameStart();
});

tiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
        // tile hanya dapat diisi ketika game sudah dimulai
        if (ticTacToe.getAttribute('game-start') === 'true') {
            // tile hanya dapat diisi jika masih kosong
            if (tile.getAttribute('data-filled') === 'false') {
                if (count % 2 === 0) {
                    human.play(tile);
                } else {
                    computer.play(tile);
                };
                
                tile.setAttribute('data-filled', 'true');   // menandai tile sudah diisi  
                resultCheck();                              // memeriksa hasil akhir game
            };
        };
    });
});

restartButton.addEventListener('click', () => {
    gameStart();
});

// GAME CONTROL

function gameStart() {
    human  = new Player('Human', 'x');
    computer = new Player('Computer', 'o');
    count = 0;

    ticTacToe.setAttribute('game-start', 'true');       // start the game
    gameBoard.style.filter = 'blur(0)';                 // remove blur on game board
    resetTiles();                                       // reset the tiles
    modal.classList.add('hide');                        // hide the modal
    startButton.classList.add('class', 'hide');         // hide start button
    restartButton.classList.remove('class', 'hide');    // show restart button
};

function gameStop() {
    ticTacToe.setAttribute('game-start', 'false');  // stop the game
    gameBoard.style.filter = 'blur(5px)';           // blur the game board
    modal.classList.remove('hide');                 // show the modal
    startButton.classList.remove('class', 'hide');  // show start button
    restartButton.classList.add('class', 'hide');   // hide restart button
};

// FUNCTIONS

function resetTiles() {
    tiles.forEach(tile => {
        tile.innerHTML = '';
        tile.setAttribute('data-filled', 'false');
    });
};

function Player(name, mark) {
    this.name = name;
    this.answer = [];

    if (mark === 'x' || mark === 'X') {this.mark = '<i class="fa-solid fa-xmark">'}
    else if (mark === 'o' || mark === 'O') {this.mark = '<i class="fa-solid fa-circle">'};

    this.play = function(tile) {
        this.answer.push(tile.getAttribute('data-tile'));
        tile.innerHTML = this.mark;
        count += 1;
    };
};

function resultCheck() {
    const win = ['123', '456', '789', '147', '258', '369', '159', '357'];
    let winner;

    win.some(condition => {
        if (subArrayCheck(human.answer, condition.split(''))) {
            winner = human;
            return true;
        } else if (subArrayCheck(computer.answer, condition.split(''))) {
            winner = computer;
            return true;
        };
    });

    if (winner !== undefined) {
        modalText(`${winner.name} wins!`);
        gameStop();;
    };
    
    if (winner === undefined && count === 9) {
        modalText('Draw!')
        gameStop();
    }
};

function subArrayCheck(arr1, arr2) {
    // check if arr1 contains arr2
    // arr1.length >= arr2.length
    return arr2.every(element => arr1.indexOf(element) !== -1);
};

function modalText(text) {
    modal.firstElementChild.innerText = text;
}

const papanGame = (() => {
    const tiles = document.querySelectorAll('.tile');
    return {tiles};
})();