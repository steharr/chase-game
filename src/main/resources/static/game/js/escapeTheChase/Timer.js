export class Timer {

    constructor(initialTime) {
        this.initialTime = initialTime;
        this.currentTime = initialTime;
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
            updatedTime = this.initialTime;
        }
        $("#timer").text(
            updatedTime
        );
    }


    complete() {
        clearInterval(this.timerInterval);
    }

    getTime() {
        this.currentTime = $("#timer").text();
        let mins = this.currentTime !== "0:0" ? this.currentTime.split(":")[0] : "";
        let secs = this.currentTime !== "0:0" ? this.currentTime.split(":")[1] : "";
        return [parseInt(mins), parseInt(secs)];
    }

}