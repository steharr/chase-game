import {
    Asset
} from './Asset.js';
import {
    Route
} from './Route.js';

export class Character extends Asset {
    constructor(name, color) {
        super(name, color);
        this.route = new Route(color);
    }
    move(direction) {
        let newLoc;
        if (this.location) {
            switch (direction) {
                case 'up':
                    newLoc = [
                        this.location[0], // x
                        this.location[1] + 1, // y
                    ];
                    if (!this.obscured(newLoc)) {
                        this.setStatus("move-up");
                        this.clear();
                        this.spawn(newLoc);
                        this.route.record(newLoc);
                    }
                    break;
                case 'down':
                    newLoc = [
                        this.location[0], // x
                        this.location[1] - 1, // y
                    ];
                    if (!this.obscured(newLoc)) {
                        this.setStatus("move-down");
                        this.clear();
                        this.spawn(newLoc);
                        this.route.record(newLoc);
                    }
                    break;
                case 'left':
                    newLoc = [
                        this.location[0] - 1, // x
                        this.location[1], // y
                    ];
                    if (!this.obscured(newLoc)) {
                        this.setStatus("move-left");
                        this.clear();
                        this.spawn(newLoc);
                        this.route.record(newLoc);
                    }
                    break;
                case 'right':
                    newLoc = [
                        this.location[0] + 1, // x
                        this.location[1], // y
                    ];
                    if (!this.obscured(newLoc)) {
                        this.setStatus("move-right");
                        this.clear();
                        this.spawn(newLoc);
                        this.route.record(newLoc);
                    }
                    break;
            }
        } else {
            return false;
        }
    }
    obscured(pos) {
        let target = $(`div[data-x="${pos[0]}"][data-y="${pos[1]}"]`);
        // check if off board or in collision with asset
        if (!target.length || target.hasClass('obstacle') || target.hasClass('enemy')) {
            return true;
        } else {
            return false;
        }
    }
    immediate(direction) {
        // gives coordinates of immediate location from given u, d, l, r
        if (this.location) {
            switch (direction) {
                case 'up':
                    return [this.location[0], this.location[1] + 1]
                case 'down':
                    return [this.location[0], this.location[1] - 1]
                case 'left':
                    return [this.location[0] - 1, this.location[1]]
                case 'right':
                    return [this.location[0] + 1, this.location[1]]
            }
        }
    }
}

// https://stackoverflow.com/questions/1318076/jquery-hasattr-checking-to-see-if-there-is-an-attribute-on-an-element
$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};