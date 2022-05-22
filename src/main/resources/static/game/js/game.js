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
let cat = new Ai('cat', 'red', 'hard');
let cheese = new Asset('cheese', 'yellow');
let orchestrator = new Orchestrator(mouse.name, cat.name, cheese.name);
let gameAssets = new GameAssets();
let enemies = [cat];

$(document).ready(function () {
    generateObstacles();

    // *** User ***
    mouse.id = gameAssets.generateUniqueAssetId();
    mouse.spawn([5, 5]);

    // *** User ***
    cat.id = gameAssets.generateUniqueAssetId();
    cat.spawn([8, 8]);
    cat.target = mouse.id;

    // *** Goal ***
    cheese.id = gameAssets.generateUniqueAssetId();
    cheese.spawn([10, 10]);

    // *** Timer ***
    setInterval(gameTimer, 1000);
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

function gameTimer() {
    let updatedTime;
    let timerState = $("#timer").text();
    if (timerState !== "") {
        let time = timerState.split(":");
        let mins = time[0];
        let secs = time[1];

        if (secs === "00") {
            let updatedMins = parseInt(mins) - 1;
            updatedTime = updatedMins + ":59";
        } else {
            let updatedSecs = parseInt(secs) - 1;
            updatedTime = mins + ":" + updatedSecs;
        }

    } else {
        updatedTime = "0:10";
    }
    $("#timer").text(
        updatedTime
    );
}