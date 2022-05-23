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
        this.scoreCalculator.updateScore(!this.gameDetails.inProgress);
        this.gameDetails.score = this.scoreCalculator.getScore();
    }

    finishGame() {
        let message;
        if (this.victorious) {
            message = `You Won!!! Well done ... your score was ${this.gameDetails.score}`;
            this.gameDetails.messages.push(message);
        } else {
            message = `You Lost!!! Better luck next time ... your score was ${this.gameDetails.score}`;
            this.gameDetails.messages.push(message);
        }
        $('#messages').text(this.gameDetails.messages[0]);
    }
}