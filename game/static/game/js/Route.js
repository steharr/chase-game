export class Route {
    constructor(color) {
        this.route = [];
        this.color = color;
    }
    record(pos) {
        let icon;
        if (this.route.length !== 0) {
            let prev = this.route[this.route.length - 1];
            let diff_x = pos[0] - prev[0];
            let diff_y = pos[1] - prev[1];
            if (diff_x > 0) {
                icon = 'arrow-right';
            } else if (diff_x < 0) {
                icon = 'arrow-left';
            } else if (diff_y > 0) {
                icon = 'arrow-up';
            } else if (diff_y < 0) {
                icon = 'arrow-down';
            }
            pos.push(icon);
        } else {
            pos.push('circle');
        }
        this.route.push(pos);
    }
    display() {
        // highlight the starting point with a circle
        $(`div[data-x="${this.route[0][0]}"][data-y="${this.route[0][1]}"]`).css('background-color', this.color).html(`<i class="fa-solid fa-${this.route[0][2]}"></i>`);

        // highlight the route taken with arrows
        for (let i = 1; i < this.route.length; i++) {
            $(`div[data-x="${this.route[i][0]}"][data-y="${this.route[i][1]}"]`).css('background-color', this.color).html(`<i class="fa-solid fa-${this.route[i+1][2]}"></i>`);
        }

    }
}