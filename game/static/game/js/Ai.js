import { Character } from './Character.js';

export class Ai extends Character {
    constructor(name, color, target, difficulty) {
        super(name, color);
        this.target = target;
        this.difficulty = difficulty;
    }
    chase(){
        // decision
        let dist = this.calcRouteToPrey()
        let move = this.makeInitialDecision(dist)
        if (!move[0]){
            this.makeSecondaryDecision(move[1]);
        } 
    }
    calcRouteToPrey(){
        // find the location of their prey
        let prey = $(`#${this.target}`);
        let preyLocation = [prey.data('x'), prey.data('y')];
        // check distance to prey in both axis
        let x = Math.abs(this.location[0] - preyLocation[0]);
        let y = Math.abs(this.location[1] - preyLocation[1]);
            if (x > y) {
                let diff = this.location[0] - preyLocation[0];
                return ['x', diff];
            } else if (y > x) {
                let diff = this.location[1] - preyLocation[1];
                return ['y', diff];
            } else {
                return ['both', 0];
            }
    }
    makeInitialDecision(dist) {
        let check;
        // ** IF THE X AXIS IS FURTHER **
        if (dist[0] === 'x'){
            if (dist[1] < 0 ){
                check = this.immediate('right');
                // if the right is not obscured
                if (!this.obscured(check)) {
                    this.move('right'); // then move right
                    return [true, 'x'];
                // otherwise if the right IS obscured
                } else {
                    // check other axis (up and down)
                    return [false, 'x']
                }
            } else {
                check = this.immediate('left');
                // if the left is not obscured
                if (!this.obscured(check)) {
                    this.move('left'); // then move left
                    return [true, 'x'];
                // otherwise if the left IS obscured
                } else {
                    // check other axis (up and down)
                    return [false, 'x'];
                }
            }
        };
        // ** IF THE Y AXIS IS FURTHER **
        if (dist[0] === 'y'){
            if (dist[1] < 0 ){
                check = this.immediate('up');
                // if the up is not obscured
                if (!this.obscured(check)) {
                    this.move('up'); // then move up
                    return [true, 'y'];
                // otherwise if the up IS obscured
                } else {
                    // check other axis (left and right)
                    return [false, 'y'];
                }
            } else {
                check = this.immediate('down');
                // if the down is not obscured
                if (!this.obscured(check)) {
                    this.move('down'); // then move down
                    return [true, 'y'];
                // otherwise if the down IS obscured
                } else {
                    // check other axis (left and right)
                    return [false, 'y'];
                }
            }
        };
        // ** IF NEITHER AXIS IS FURTHER **
        if (dist[0] === 'both'){
            return [true, 'none'];
        };
    }
    makeSecondaryDecision(axis){
    // find the location of their prey
    let prey = $(`#${this.target}`);
    let preyLocation = [prey.data('x'), prey.data('y')];

        switch (axis){
            case 'x':
                let y = Math.abs(this.location[1] - preyLocation[1]);
                if (y < 0) {
                    check = this.immediate('up');
                } else if (y > 0) {
                    check = this.immediate('up');
                }

                break;
            case 'y':
                break;
        }
    }
}