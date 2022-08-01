import {
    GameSetupConstants
} from '../constants/GameSetupConstants.js';

export class Orchestrator {

    constructor(goodGuyName, badGuyName, victoryBlockName, scoreCalculator) {
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
            if (cell.classList.contains(this.goodGuyName) && cell.classList.contains(this.badGuyName)) {
                this.gameDetails.inProgress = false;
            } else if (cell.classList.contains(this.goodGuyName) && cell.classList.contains(this.victoryBlockName)) {
                this.gameDetails.victorious = true;
                this.gameDetails.inProgress = false;
            }
        });
        if (this.scoreCalculator.isEnemyNearby) {
            let message = "Enemy is close!! Watch out ...";
            this.updateGameLog(message);
        }
        this.scoreCalculator.updateScore(!this.gameDetails.inProgress);
        this.gameDetails.score = this.scoreCalculator.getScore();
    }

    finishGame() {
        let message;
        if (this.gameDetails.victorious) {
            message = `You Won!!! Well done ... your score was ${this.gameDetails.score}`;
        } else {
            message = `You Lost!!! Better luck next time ... your score was ${this.gameDetails.score}`;
        }
        this.updateGameLog(message);

        const modal = new bootstrap.Modal('#endGameModal');
        const modalTitle = document.getElementById('endGameModalTitle');
        modalTitle.textContent = this.gameDetails.victorious ? GameSetupConstants.endGameMessages.victory.title : GameSetupConstants.endGameMessages.defeat.title;
        const container = document.getElementById('container-modal-header');
        this.gameDetails.victorious ? container.classList.add('bg-success') : container.classList.add('bg-danger');
        const modalBody = document.getElementById('endGameModalBody');
        modalBody.textContent = this.gameDetails.victorious ? GameSetupConstants.endGameMessages.victory.body : GameSetupConstants.endGameMessages.defeat.body;
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
}