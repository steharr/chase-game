export class ScoreManager {

    constructor(user, enemies, timer) {
        this.user = user;
        this.enemies = enemies;
        this.timer = timer;
        this.total = 0;
        this.headers = this.setupHttpHeaders();
        this.scoreUrl = window.location.href.match(/^.*\//) + "score";
    }

    setupHttpHeaders() {
        let token = $("meta[name='_csrf']").attr("content");
        let header = $("meta[name='_csrf_header']").attr("content");
        return {
            [header]: token,
            "charset": "UTF-8",
            "Content-Type": "application/json"
        }
    }

    updateScore(gameFinished = false) {
        this.enemies.forEach(enemy => {
            // determine if enemy is within two blocks & increment score
            if (this.isEnemyNearby(this.user, enemy)) {
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

    isEnemyNearby(asset1, asset2) {
        let distBetweenAssets = this.calcDistance(asset1, asset2)
        if (distBetweenAssets[0] <= 1 && distBetweenAssets[1] <= 1) {
            return true;
        }
        return false;
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

    postScore() {
        let saveScore = this.total;
        let data = {
            score: saveScore,
            date: new Date()
        };
        fetch(this.scoreUrl, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(res => console.log(res)).catch(err => console.log(err))
    }

    getScores() {
        fetch(this.scoreUrl, {
            method: "GET",
            headers: this.headers,
        }).then(res => console.log(res)).catch(err => console.log(err))
    }
}