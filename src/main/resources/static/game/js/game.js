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
import {
    GameSetupConstants
} from '../constants/GameSetupConstants.js';


const difficulty = GameSetupConstants.difficulties[GAME_SETUP.difficulty];
const obstacles = GameSetupConstants.obstacles[GAME_SETUP.obstacles];
const enemies = generateEnemies(GAME_SETUP.enemies);

let user = new Character('user', 'blue');

let cheese = new Asset('cheese', 'yellow');
let timer = new Timer("2:00");
let gameAssets = new GameAssets();

let scoreManager;
let orchestrator;

$(document).ready(function () {

    // *** Level ***
    generateObstacles(obstacles);

    // *** User ***
    user.id = gameAssets.generateUniqueAssetId();
    user.spawn([GameSetupConstants.botLeftCord.x, GameSetupConstants.botLeftCord.y]);

    // *** Enemy ***
    let y = GameSetupConstants.topRightCord.y;
    let x = GameSetupConstants.topRightCord.x;
    for (let e of enemies) {
        e.id = gameAssets.generateUniqueAssetId();
        e.spawn([x, y]);
        e.target = user.id;
        y--;
    }

    // *** Goal ***
    cheese.id = gameAssets.generateUniqueAssetId();
    cheese.spawn([10, 10]);

    // *** Game Setup ***
    scoreManager = new ScoreManager(user, enemies, timer);
    orchestrator = new Orchestrator(user.name, enemies[0].name, cheese.name, scoreManager);

    // *** Timer ***
    timer.initialize();
});

$(document).on('keydown', function (e) {
    let key = e.code;
    switch (key) {
        // up
        case "ArrowUp":
            user.move('up');
            orchestrator.orchestrate(enemies);
            break;
            // down
        case "ArrowDown":
            user.move('down');
            orchestrator.orchestrate(enemies);
            break;
            // left
        case "ArrowLeft":
            user.move('left');
            orchestrator.orchestrate(enemies);
            break;
            // right
        case "ArrowRight":
            user.move('right');
            orchestrator.orchestrate(enemies);
            break;
            // space
        case "Space":
            // cat.route.display();
            // user.route.display();
            scoreManager.postScore();
            break;
        case "Enter":
            location.reload();
            break;
    }

});

function generateObstacles(desiredObstacles) {

    let obstacleCount = 0;
    let obstacleCells = [];

    while (obstacleCount < desiredObstacles) {
        let randomCell;
        let isSameCell;

        do {
            randomCell = generateRandomCellReference();

            isSameCell = (element) => {
                return element[0] === randomCell.y && element[1] === randomCell.x;
            }

        } while (obstacleCells.some(isSameCell));


        obstacleCells.push[randomCell];
        const cell = $(`div[data-x="${randomCell.y}"][data-y="${randomCell.x}"]`);
        cell.addClass('obstacle');
        obstacleCount++;
    }

}

function generateEnemies(number) {

    let eList = [];

    for (let i = 0; i < number; i++) {
        let e = new Ai('enemy', 'red', (i < Math.floor(number * 0.75)) ? difficulty : 'easy');
        eList.push(e);
    }

    return eList;
}

function generateRandomCellReference() {
    const randomRow = Math.floor(Math.random() * ROWS);
    const randomCol = Math.floor(Math.random() * COLS);
    return {
        x: randomRow,
        y: randomCol
    };
}