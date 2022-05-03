import {
    Asset
} from './Asset.js';
import {
    Character
} from './Character.js';
import {
    Ai
} from './Ai.js';
import {
    Orchestrator
} from './Orchestrator.js';
import {
    GameAssets
} from './GameAssets.js';

let mouse = new Character('mouse', 'blue');
let cat = new Ai('cat', 'red', 'mouse', 'hard');
let cat2 = new Ai('cat2', 'green', 'mouse', 'hard');
let cat3 = new Ai('cat3', 'purple', 'mouse', 'hard');
let cheese = new Asset('cheese', 'yellow');
let orchestrator = new Orchestrator();
let gameAssets = new GameAssets();
let enemies = [cat, cat2, cat3];

$(document).ready(function () {
    generateObstacles();
    mouse.id = gameAssets.generateUniqueAssetId();
    mouse.spawn([5, 5]);
    cat.id = gameAssets.generateUniqueAssetId();
    cat.spawn([8, 8]);
    cat2.id = gameAssets.generateUniqueAssetId();
    cat2.spawn([2, 12]);
    cat3.id = gameAssets.generateUniqueAssetId();
    cat3.spawn([20, 14]);
    cheese.id = gameAssets.generateUniqueAssetId();
    cheese.spawn([10, 10]);
});

$(document).on('keydown', function (e) {
    let key = e.code;
    switch (key) {
        // up
        case "ArrowUp":
            mouse.move('up');
            orchestrator.orchestrate(enemies);
            break;
            // down
        case "ArrowDown":
            mouse.move('down');
            orchestrator.orchestrate(enemies);
            break;
            // left
        case "ArrowLeft":
            mouse.move('left');
            orchestrator.orchestrate(enemies);
            break;
            // right
        case "ArrowRight":
            mouse.move('right');
            orchestrator.orchestrate(enemies);
            break;
            // space
        case "Space":
            cat.route.display();
            mouse.route.display();
            break;
    }
});

function generateObstacles() {
    let cell;

    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < 3; j++) {
            let jj = Math.floor(Math.random() * COLS);
            cell = $(`div[data-x="${jj}"][data-y="${i}"]`)
            cell.addClass('obstacle');
        }
    }
}