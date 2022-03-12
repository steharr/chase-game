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

