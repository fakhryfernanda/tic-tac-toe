// GLOBAL VARIABLES

const ticTacToe = document.querySelector('.tic-tac-toe');
let human;
let computer;
let count;

// MODULES AND FACTORIES

const board = (() => {
    const self = ticTacToe.querySelector('[data-game-board]');
    const tiles = ticTacToe.querySelectorAll('[data-tile]');
    const startButton = ticTacToe.querySelector('[data-button="start"]');
    const restartButton = ticTacToe.querySelector('[data-button="restart"]');
    const modal = ticTacToe.querySelector('.modal');

    const resetTiles = function() {
        tiles.forEach(tile => {
            tile.innerHTML = '';
            tile.setAttribute('data-filled', 'false');
        });
    };

    function modalText(text) {
        board.modal.firstElementChild.innerText = text;
    }

    const hideElement = function(element) {
        element.classList.add('hide');
    };

    const showElement = function(element) {
        element.classList.remove('hide');
    };

    return {self, tiles, startButton, restartButton, modal, resetTiles, modalText, hideElement, showElement};
})();

const game = (() => {
    const start = function() {
        human  = new Player('Human', 'x');
        computer = new Player('Computer', 'o');
        count = 0;
    
        ticTacToe.setAttribute('game-start', 'true');   // start the game
        board.self.style.filter = 'blur(0)';            // remove blur on game board
        board.resetTiles();                             // reset the tiles
        board.hideElement(board.modal);                 // hide the modal
        board.hideElement(board.startButton);           // hide start button
        board.showElement(board.restartButton);         // show restart button
    };

    const stop = function() {
        ticTacToe.setAttribute('game-start', 'false');  // stop the game
        board.self.style.filter = 'blur(5px)';          // blur the game board
        board.showElement(board.modal);                 // show the modal
        board.showElement(board.startButton);           // show start button
        board.hideElement(board.restartButton);         // hide restart button
    };

    function subArrayCheck(arr1, arr2) {
        // check if arr1 contains arr2
        // arr1.length >= arr2.length
        return arr2.every(element => arr1.indexOf(element) !== -1);
    };

    const resultCheck = function() {
        let winner;
        const win = ['123', '456', '789', '147', '258', '369', '159', '357'];
    
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
            board.modalText(`${winner.name} wins!`);
            game.stop();;
        };
        
        if (winner === undefined && count === 9) {
            board.modalText('Draw!')
            game.stop();
        }
    };

    return {start, stop, resultCheck};
})();

function Player(name, mark) {
    this.name = name;
    this.answer = [];

    if (mark === 'x' || mark === 'X') {this.mark = '<i class="fa-solid fa-xmark">'}
    else if (mark === 'o' || mark === 'O') {this.mark = '<i class="fa-solid fa-circle">'};

    this.play = function(tile) {
        this.answer.push(tile.getAttribute('data-tile'));
        tile.innerHTML = this.mark;
        count += 1;
        tile.setAttribute('data-filled', 'true'); // menandai tile sudah diisi
    };
};

// Event Listeners

board.startButton.addEventListener('click', () => {
    game.start();
});

board.tiles.forEach(tile => {
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
                
                game.resultCheck();  // memeriksa hasil akhir game
            };
        };
    });
});

board.restartButton.addEventListener('click', () => {
    game.start();
});
