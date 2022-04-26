export class Orchestrator {

    constructor() {

    }

    orchestrate(enemies) {
        enemies.forEach(enemy => {
            enemy.chase();
        });
    }

    extractGameState() {

        // $(".cell").forEach()

    }
}