export class Orchestrator {

    constructor(goodGuyName, badGuyName, victoryBlockName) {
        this.gameState = [];
        this.goodGuyName = goodGuyName;
        this.badGuyName = badGuyName;
        this.victoryBlockName = victoryBlockName;
    }

    orchestrate(enemies) {
        enemies.forEach(enemy => {
            enemy.chase();
        });
        this.extractGameState();
    }

    extractGameState() {
        $(".cell").toArray().forEach(cell => {
            if (cell.classList.contains(this.goodGuyName) && cell.classList.contains(this.badGuyName)) {
                console.log("Game Over!");
                document.location.reload();
            } else if (cell.classList.contains(this.goodGuyName) && cell.classList.contains(this.victoryBlockName)) {
                console.log("Victory!");
                document.location.reload();
            }
        });
    }
}