export class Asset {
    constructor(name, color) {
      this.name = name;
      this.color = color;
      this.location = null;
    }
    exists(){
        if ($(`#${this.name}`).length){
            return true;
        } else {
            return false;
        }
    }
    locate(){
        if (this.exists()){
            this.location  = [$(`#${this.name}`).data('x'),$(`#${this.name}`).data('y')]
            return this.location;
        } else {
            return false;
        }
    }
    spawn(pos){
        let target = $(`div[data-x="${pos[0]}"][data-y="${pos[1]}"]`)
        this.location = [pos[0], pos[1]];
        target.attr('id', this.name).css('background-color', this.color);
        return this.location;
    }
    clear(){
        let target = $(`div[data-x="${this.location[0]}"][data-y="${this.location[1]}"]`)
        target.removeAttr('id', this.name).removeAttr('style');
    }
};


export class UserCharacter extends Asset {
    constructor(name, color) {
        super(name, color);
        this.route = new Route();
    }
    move(direction){
        let newLoc;
        if (this.location){
            switch (direction){
                case 'up':
                    newLoc = [
                        this.location[0], // x
                        this.location[1] + 1, // y
                    ];
                    if (!this.obscured(newLoc)){
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
                    if (!this.obscured(newLoc)){
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
                    if (!this.obscured(newLoc)){
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
                    if (!this.obscured(newLoc)){
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

    obscured(pos){
        let target = $(`div[data-x="${pos[0]}"][data-y="${pos[1]}"]`);
        // check if off board or in collision with asset
        if (!target.length || target.hasAttr('id') || target.hasClass('obstacle')){
            return true;
        } else {
            return false;
        }
    }

    immediate(direction){
        // gives coordinates of immediate location from given u, d, l, r
        if (this.location){
            switch (direction){
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

export class AiCharacter extends UserCharacter {

    constructor(name, color, target, difficulty) {
        super(name, color);
        this.target = target;
        this.difficulty = difficulty;
    }

    chase(){
        // decision
        let dist = this.calcRouteToPrey()
        let check;
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
                return ['x', diff]
            } else if (y > x) {
                let diff = this.location[1] - preyLocation[1];
                return ['y', diff]
            }
    }

    makeInitialDecision(dist) {
        let check;
        // IF THE X AXIS IS FURTHER
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
        // IF THE Y AXIS IS FURTHER 
        } else if (dist[0] === 'y'){
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
        }
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

// https://stackoverflow.com/questions/1318076/jquery-hasattr-checking-to-see-if-there-is-an-attribute-on-an-element
$.fn.hasAttr = function(name) {  
    return this.attr(name) !== undefined;
};

class Route {
    constructor() {
        this.route = [];
    }
    record(pos){
        this.route.push(pos);
    }
    display(){
        this.route.forEach(function(step, index){
            $(`div[data-x="${step[0]}"][data-y="${step[1]}"]`).css('background-color','orange').text(index);
        });
    }
}