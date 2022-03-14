import {
    Asset
} from './Asset.js';
import {
    Character
} from './Character.js';
import {
    Ai
} from './Ai.js';

let mouse = new Character('mouse', 'blue');
let cat = new Ai('cat', 'red', 'mouse', 'hard');
let cheese = new Asset('cheese', 'yellow');

$(document).ready(function () {
    generateObstacles();
    mouse.spawn([5, 5]);
    cat.spawn([8, 8]);
    cheese.spawn([10, 10]);
});

$(document).on('keydown', function (e) {
    let key = e.code;
    switch (key) {
        // up
        case "ArrowUp":
            mouse.move('up');
            cat.chase();
            break;
            // down
        case "ArrowDown":
            mouse.move('down');
            cat.chase();
            break;
            // left
        case "ArrowLeft":
            mouse.move('left');
            cat.chase();
            break;
            // right
        case "ArrowRight":
            mouse.move('right');
            cat.chase();
            break;
            // space
        case "Space":
            cat.route.display();
            mouse.route.display();
    }
});

function generateObstacles() {
    let cell;
    const ROWS = JSON.parse(document.getElementById('game-board-rows').textContent);
    const COLS = JSON.parse(document.getElementById('game-board-cols').textContent);

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < 3; j++) {
            let jj = Math.floor(Math.random() * COLS);
            cell = $(`div[data-x="${jj}"][data-y="${i}"]`)
            cell.addClass('obstacle');
        }
    }
}