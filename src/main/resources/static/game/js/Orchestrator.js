export class Orchestrator {

    constructor() {

    }

    orchestrate(enemies) {
        enemies.forEach(enemy => {
            enemy.chase();
        });
    }
}