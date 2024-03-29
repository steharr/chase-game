import {GameSetupConstants} from '../constants/GameSetupConstants.js';
import {Ai} from './Ai.js';
import {Asset} from './Asset.js';
import {Character} from './Character.js';
import {GameAssets} from './GameAssets.js';
import {Orchestrator} from './Orchestrator.js';
import {ScoreManager} from './ScoreManager.js';
import {Timer} from './Timer.js';


const difficulty = GameSetupConstants.difficulties[GAME_SETUP.difficulty];
const obstacles = GameSetupConstants.obstacles[GAME_SETUP.obstacles];
const enemies = generateEnemies(GAME_SETUP.enemies);

let user = new Character('user', 'blue');

let cheese = new Asset('cheese', 'yellow');
cheese.hideBackgroundColor();
let timer = new Timer("2:00");
let gameAssets = new GameAssets();

let scoreManager;
let orchestrator;

window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

$(document).ready(function () {
    startGame();
});

$(document).on('keydown', function (e) {
    let key = e.code;
    if (!orchestrator.gameplayPaused) {

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
            case "Enter":
                location.reload();
                break;
        }

    }

});
document.getElementById("restartGame").addEventListener("click", () => {
    $('#endGameModal').modal('hide');
    refreshGameBoard();
    startGame();
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
        const randomRockNumber = generateRandomNumber(1, 4);

        cell.addClass(`rock-${randomRockNumber}`);
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

function generateRandomNumber(min, max) {
    let random = Math.round((Math.random()) * max);

    if (random < min) {
        while (random < min) {
            random = Math.round((Math.random()) * max);
        }
    }

    return random;
}

function generateEndGoal() {

    let safeLocationFound = false;
    let randomCell;
    while (!safeLocationFound) {
        randomCell = generateRandomCellReference();

        if (randomCell.x < COLS && randomCell.x > 0 && randomCell.y < ROWS && randomCell.y > 0) {
            const cell = $(`div[data-x="${randomCell.x}"][data-y="${randomCell.y}"]`);

            if (!cell[0].classList.contains('obstacle')) {
                safeLocationFound = true;
            }
        }
    }
    cheese.spawn([randomCell.x, randomCell.y]);
}

function startGame() {
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

    // *** Game Setup ***
    scoreManager = new ScoreManager(user, enemies, timer);
    orchestrator = new Orchestrator(user.name, enemies[0].name, cheese.name, scoreManager, user);

    // *** Timer ***
    timer.initialize();

    generateEndGoal();
}

function refreshGameBoard() {
    const cells = document.getElementsByClassName("cell");

    Array.from(cells).forEach(cell => {
        cell.className = "";
        cell.removeAttribute("id");
        cell.classList.add("bo");
        cell.classList.add("cell");
    })
}
