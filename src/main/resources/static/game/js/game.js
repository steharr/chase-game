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
import {
    Timer
} from './Timer.js';
import {
    ScoreManager
} from './ScoreManager.js';

let mouse = new Character('user', 'blue');
let cat = new Ai('enemy', 'red', 'easy');
let cat2 = new Ai('enemy', 'red', 'hard');
let cheese = new Asset('cheese', 'yellow');
let timer = new Timer("2:00");
let gameAssets = new GameAssets();
let enemies = [cat, cat2];
let scoreManager = new ScoreManager(mouse, enemies, timer)
let orchestrator = new Orchestrator(mouse.name, cat.name, cheese.name, scoreManager);

$(document).ready(function () {

    // *** Level ***
    generateObstacles();

    // *** User ***
    mouse.id = gameAssets.generateUniqueAssetId();
    mouse.spawn([5, 5]);

    // *** Enemy ***
    cat.id = gameAssets.generateUniqueAssetId();
    cat.spawn([8, 8]);
    cat.target = mouse.id;

    cat2.id = gameAssets.generateUniqueAssetId();
    cat2.spawn([15, 12]);
    cat2.target = mouse.id;

    // *** Goal ***
    cheese.id = gameAssets.generateUniqueAssetId();
    cheese.spawn([10, 10]);

    // *** Timer ***
    timer.initialize();

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
            // cat.route.display();
            // mouse.route.display();
            scoreManager.postScore();
            break;
        case "Enter":
            location.reload();
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