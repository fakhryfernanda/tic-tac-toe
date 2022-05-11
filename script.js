const gameBoard = document.querySelector('[data-gameBoard]');
const tiles = gameBoard.querySelectorAll('[data-tile]');

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