export class Route {
    constructor() {
        this.route = [];
    }
    record(pos) {
        this.route.push(pos);
    }
    display() {
        this.route.forEach(function (step, index) {
            $(`div[data-x="${step[0]}"][data-y="${step[1]}"]`).css('background-color', 'orange').text(index);
        });
    }
}