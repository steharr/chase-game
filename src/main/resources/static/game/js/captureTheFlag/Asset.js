export class Asset {
    constructor(name, color, gameAssets) {
        this.name = name;
        this.color = color;
        this.location = null;
        this.status = "stationary";
        this.gameAssets = gameAssets;
        this.id = gameAssets.generateUniqueAssetId();
    }
    exists() {
        if ($(`#${this.name}`).length) {
            return true;
        } else {
            return false;
        }
    }
    locate() {
        if (this.exists()) {
            this.location = [$(`#${this.name}`).data('x'), $(`#${this.name}`).data('y')]
            return this.location;
        } else {
            return false;
        }
    }
    spawn(pos) {
        let target = $(`div[data-x="${pos[0]}"][data-y="${pos[1]}"]`);
        this.location = [pos[0], pos[1]];
        target.attr("id", this.id);
        target.toggleClass(this.name);
        target.toggleClass(this.name + "-" + this.status);
        target.css('background-color', this.color);
        return this.location;
    }
    clear() {
        let target = $(`div[data-x="${this.location[0]}"][data-y="${this.location[1]}"]`);
        target.removeAttr('id', this.name)
        target.removeAttr('style');
        target.toggleClass(this.name);
        target.toggleClass(this.name + "-" + this.status);
    }
    setStatus(status) {
        let target = $(`div[data-x="${this.location[0]}"][data-y="${this.location[1]}"]`);
        target.toggleClass(this.name + "-" + this.status);
        this.status = status;
        target.toggleClass(this.name + "-" + this.status);
    }
};