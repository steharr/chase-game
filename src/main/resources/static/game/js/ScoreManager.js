import { Spinner } from "./Spinner.js";

export class ScoreManager {

    constructor(user, enemies, timer) {
        this.user = user;
        this.enemies = enemies;
        this.timer = timer;
        this.total = 0;
        this.headers = this.setupHttpHeaders();
        this.scoreUrl = window.location.href.match(/^.*\//) + "score";
        this.enemyNearUser = false;
        this.route = this.user.route.route;
        this.username = "";
        this.setupSaveMethod();
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

    calculateScore(gameFinished = false) {
        this.enemies.forEach(enemy => {
            // determine if enemy is within two blocks & increment score
            if (this.determineIfEnemyNearby(this.user, enemy)) {
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

    updateScoreDisplay() {
        const scoreElement = document.getElementById('game-score');
        scoreElement.innerText = this.total;
    }

    zeroScore() {
        this.total = 0;
    }

    determineIfEnemyNearby(asset1, asset2) {
        let distBetweenAssets = this.calcDistance(asset1, asset2)
        if (distBetweenAssets[0] <= 1 && distBetweenAssets[1] <= 1) {
            this.enemyNearUser = true;
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
            date: new Date(),
            route: this.route,
            user: this.username
        };

        const spinner = new Spinner("postScore");

        spinner.startSpinner();

        setTimeout(()=>{
            fetch(this.scoreUrl, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(data)
            }).then(res => {
                spinner.stopSpinner("Saved", true);
            }).catch(err => console.log(err))

        },500);

    }

    getScores() {
        let leaderboards;
        fetch(this.scoreUrl, {
            method: "GET",
            headers: this.headers,
        }).then(res => leaderboards = res).catch(err => console.log(err))
        return leaderboards;
    }

    setupSaveMethod(){

        document.getElementById("postScore").addEventListener("click", ()=>{
            this.postScore();
        })

        document.getElementById("postUsername").addEventListener("change",(event)=>{
            this.username = event.target.value;
        })
    }

    
}