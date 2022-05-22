export class Timer {

    constructor(initialTime) {
        this.initialTime = initialTime;
    }

    initialize() {
        this.timerInterval = setInterval(this.update.bind(this), 1000);
    }

    update() {
        let updatedTime;
        let timerState = $("#timer").text();
        if (timerState !== "") {
            let time = timerState.split(":");
            let mins = time[0];
            let secs = time[1];
            let updatedMins = parseInt(mins) - 1;
            let updatedSecs = parseInt(secs) - 1;

            if (updatedSecs === -1 && updatedMins === -1) {
                this.complete();
            } else if (updatedSecs === -1) {
                updatedTime = updatedMins + ":59";
            } else {
                updatedTime = mins + ":" + updatedSecs;
            }
        } else {
            updatedTime = "0:10";
        }
        $("#timer").text(
            updatedTime
        );
    }

    complete() {
        clearInterval(this.timerInterval);
        console.log("Game Finished");
    }

}