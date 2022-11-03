import {
    GameEvents
} from '../../constants/GameEvents.js';
import {
    GameMessages
} from '../../constants/GameMessages.js';
import {
    GameSetupConstants
} from '../../constants/GameSetupConstants.js';
import {
    GameEventsManager
} from './GameEventsManager.js';

export class Orchestrator {

    constructor(goodGuyName, badGuyName, victoryBlockName, scoreCalculator, user, arrEnemies, baseEnemy, baseUser, flag) {
        this.gameDetails = {
            inProgress: true,
            victorious: false,
            score: 0,
            messages: []
        };
        this.goodGuyName = goodGuyName;
        this.badGuyName = badGuyName;
        this.victoryBlockName = victoryBlockName;
        this.scoreCalculator = scoreCalculator;
        this.user = user;
        this.arrEnemies = arrEnemies;
        this.baseEnemy = baseEnemy;
        this.baseUser = baseUser;
        this.flag = flag;

        this.eventManager = new GameEventsManager();
        this.setupGameEvents();
    }

    setupGameEvents() {
        this.eventManager.addEvent(GameEvents.USER_CAPTURED_FLAG);
        this.eventManager.target.addEventListener(GameEvents.USER_CAPTURED_FLAG, () => this.handleFlagGrabByUserEvent());
    }

    orchestrate(enemies) {
        enemies.forEach(enemy => {
            enemy.chase();
        });
        this.updateGameDetails();
        if (!this.gameDetails.inProgress) {
            this.finishGame();
        }
    }

    updateGameDetails() {
        $(".cell").toArray().forEach(cell => {

            let cellContents = cell.classList;

            if (this.userFlagGrabEvent(cellContents)) {
                this.eventManager.publishEvent(GameEvents.USER_CAPTURED_FLAG);
            }

            if (this.userFlagReturnEvent(cellContents)) {
                this.handleFlagReturnByUserEvent();
            }

            if (this.enemyFlagGrabEvent(cellContents)) {
                const flagBearer = this.getFlagBearer(cell, this.arrEnemies);
                this.handleFlagGrabByEnemyEvent(flagBearer);
            }

            if (this.enemyFlagReturnEvent(cellContents)) {
                const flagBearer = this.getFlagBearer(cell, this.arrEnemies);
                this.handleFlagReturnByEnemyEvent(flagBearer);
            }

        });
        if (this.scoreCalculator.enemyNearUser) {
            let message = GameMessages.enemyClose;
            this.updateGameLog(message);
        }



        this.gameDetails.score = this.scoreCalculator.getScore();
    }

    finishGame() {
        let message;
        if (this.gameDetails.victorious) {
            message = GameMessages.gameWin(this.gameDetails.score);
        } else {
            message = GameMessages.gameLose(this.gameDetails.score);
        }
        this.updateGameLog(message);

        const modal = new bootstrap.Modal('#endGameModal');
        const modalTitle = document.getElementById('endGameModalTitle');
        modalTitle.textContent = this.gameDetails.victorious ? GameSetupConstants.endGameMessages.victory.title : GameSetupConstants.endGameMessages.defeat.title;
        const container = document.getElementById('container-modal-header');
        this.gameDetails.victorious ? container.classList.add('bg-success') : container.classList.add('bg-danger');
        const modalBody = document.getElementById('endGameModalBody');
        modalBody.textContent = this.gameDetails.victorious ? GameSetupConstants.endGameMessages.victory.body : GameSetupConstants.endGameMessages.defeat.body;
        if (this.gameDetails.victorious) {
            this.scoreCalculator.postScore();
        }
        modal.show();
    }

    updateGameLog(messageText) {
        let timeStr = (new Date()).getHours() + ":" + (new Date()).getMinutes();
        let messageInfo = {
            message: messageText,
            time: timeStr
        }
        this.gameDetails.messages.push(messageInfo);
        $('#messages').prepend(`
        <li class="list-group-item">
        <div class="row">
            <div class="col-8">
                <span class="left">${messageInfo.message}</span>
            </div>
            <div class="col-4">
                <span class="right">${messageInfo.time}</span>
            </div>
	    </div>
        </li>
        `);
    }



    // *** EVENTS **
    userFlagGrabEvent(conditions) {
        return conditions.contains(this.user.name) && conditions.contains(this.victoryBlockName);
    }
    userFlagReturnEvent(conditions) {
        return conditions.contains(this.user.name) && conditions.contains(this.baseUser.name);
    }
    enemyFlagGrabEvent(conditions) {
        return conditions.contains(this.arrEnemies[0].name) && conditions.contains(this.victoryBlockName);
    }
    enemyFlagReturnEvent(conditions) {
        return conditions.contains(this.arrEnemies[0].name) && conditions.contains(this.baseEnemy.name);
    }
    handleFlagGrabByUserEvent() {
        this.user.hasFlag = true;
        this.user.setStatus("captured-flag");

        this.arrEnemies.forEach(enemy => {
            enemy.target = this.user.id;
        })
    }
    handleFlagReturnByUserEvent() {
        this.user.hasFlag = false;
        this.user.setStatus('stationary');

        this.arrEnemies.forEach(enemy => {
            enemy.target = this.flag.id;
        })

        this.scoreCalculator.updateScore();
        this.scoreCalculator.updateScoreDisplay();
    }
    handleFlagGrabByEnemyEvent(enemyFlagBearer) {
        enemyFlagBearer.hasFlag = true;
        enemyFlagBearer.target = this.baseEnemy.id;
        enemyFlagBearer.setStatus("captured-flag");
        const otherEnemies = this.arrEnemies.filter(e => e.id !== enemyFlagBearer.id);

        otherEnemies.forEach(enemy => {
            enemy.target = this.user.id;
        })
    }
    handleFlagReturnByEnemyEvent(enemyFlagBearer) {
        enemyFlagBearer.hasFlag = false;
        enemyFlagBearer.setStatus('stationary');

        this.arrEnemies.forEach(enemy => {
            enemy.target = this.flag.id;
        })
    }
    // *** END **

    // *** UTILS **
    getFlagBearer(cell, arrEnemies) {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        return arrEnemies.filter(e => e.location[0] === x && e.location[1] === y)[0];
    }
    // *** END **

}