export class Score {

    constructor(user, enemies, timer) {
        this.user = user;
        this.enemies = enemies;
        this.timer = timer;
        this.total = 0;
    }

    updateScore(gameFinished = false) {
        this.enemies.forEach(enemy => {
            // determine if enemy is within two blocks & increment score
            let distBetweenAssets = this.calcDistance(this.user, enemy)
            if (distBetweenAssets[0] <= 1 && distBetweenAssets[1] <= 1) {
                this.total = this.total + 50;
            }
        });

        if (gameFinished) {
            this.total = this.total +
                Math.round(
                    (this.timer.getTime()[0]) +
                    ((1 / this.timer.getTime()[1]) * 10)
                )
        }
    }

    calcDistance(asset1, asset2) {
        // check distance between two assets
        return [
            Math.abs(asset1.location[0] - asset2.location[0]),
            Math.abs(asset1.location[1] - asset2.location[1])
        ]
    }

    getScore() {
        return this.total;
    }

}