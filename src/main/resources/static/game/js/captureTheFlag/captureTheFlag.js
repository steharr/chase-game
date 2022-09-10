import {
    GameSetupConstants
} from '../../constants/GameSetupConstants.js';
import {
    Utils
} from '../../constants/Utils.js';
import {
    Ai
} from './Ai.js';
import {
    Asset
} from './Asset.js';
import {
    Character
} from './Character.js';
import {
    GameAssets
} from './GameAssets.js';
import {
    Orchestrator
} from './Orchestrator.js';
import {
    ScoreManager
} from './ScoreManager.js';
import {
    Timer
} from './Timer.js';


// *** GAME SETUP STARTING VARS ***
const gameAssets = new GameAssets();
let flag = new Asset('flag', 'brown', gameAssets);
const difficulty = GameSetupConstants.difficulties[GAME_SETUP.difficulty];
const numberOfObstacles = GameSetupConstants.obstacles[GAME_SETUP.obstacles];

// *** GAME ASSET STARTING VARS ***
const user = new Character('user', 'blue', gameAssets);
const baseUser = new Asset('baseUser', 'blue', gameAssets);

const enemies = generateEnemies(GAME_SETUP.enemies, flag.id);
const baseEnemy = new Asset('baseEnemy', 'red', gameAssets);


let timer = new Timer("2:00");

let scoreManager;
let orchestrator;

$(document).ready(function () {

    // *** Level ***
    // generateObstacles(numberOfObstacles);

    // *** User ***
    user.spawn([GameSetupConstants.botLeftCord.x, GameSetupConstants.botLeftCord.y + 1]);

    // *** Enemies ***
    let y = GameSetupConstants.topRightCord.y - 1;
    let x = GameSetupConstants.topRightCord.x;
    for (let e of enemies) {
        e.spawn([x, y]);
        y--;
    }

    // *** Flag ***
    flag.spawn([11, 11]);

    // *** Bases ***
    baseEnemy.spawn([GameSetupConstants.topRightCord.x, GameSetupConstants.topRightCord.y]);
    baseUser.spawn([GameSetupConstants.botLeftCord.x, GameSetupConstants.botLeftCord.y]);

    // *** Game Setup ***
    scoreManager = new ScoreManager(user, enemies, timer);
    orchestrator = new Orchestrator(user.name, enemies[0].name, flag.name, scoreManager, user, enemies, baseEnemy, baseUser, flag);

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
            randomCell = Utils.generateRandomCellReference();

            isSameCell = (element) => {
                return element[0] === randomCell.y && element[1] === randomCell.x;
            }

        } while (obstacleCells.some(isSameCell));


        obstacleCells.push[randomCell];
        const cell = $(`div[data-x="${randomCell.y}"][data-y="${randomCell.x}"]`);
        cell.addClass('obstacle');
        const randomRockNumber = Utils.generateRandomNumber(1, 4);

        cell.addClass(`rock-${randomRockNumber}`);
        obstacleCount++;
    }

}


function generateEnemies(number, targetId) {

    let eList = [];

    for (let i = 0; i < number; i++) {

        let e = new Ai('enemy', 'red', (i < Math.floor(number * 0.75)) ? difficulty : 'easy', gameAssets);
        eList.push(e);
    }

    let y = GameSetupConstants.topRightCord.y;
    let x = GameSetupConstants.topRightCord.x;
    for (let e of eList) {
        e.target = targetId;
        y--;
    }

    return eList;
}