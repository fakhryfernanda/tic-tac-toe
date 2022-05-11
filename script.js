const gameBoard = document.querySelector('[data-gameBoard]');
const tiles = gameBoard.querySelectorAll('[data-tile]');
const clearButton = document.querySelector('.clear-button');

let count = 0;
tiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
        if (tile.getAttribute('data-tile') === '') {
            if (count % 2 === 1) {
                tile.innerHTML = '<i class="fa-solid fa-xmark">';
            } else {
                tile.innerHTML = '<i class="fa-solid fa-circle">';
            };
    
            tile.setAttribute('data-tile', 'filled');
            count += 1;
        };
    });
});

clearButton.addEventListener('click', () => {
    resetTiles();
});

// FUNTIONS 

function resetTiles() {
    tiles.forEach(tile => {
        tile.innerHTML = '';
        tile.setAttribute('data-tile', '');
    })
};