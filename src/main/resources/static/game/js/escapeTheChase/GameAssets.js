export class GameAssets {

    constructor() {
        this.idList = [];
    }

    generateUniqueAssetId() {
        let generatedId;
        if (this.idList.length === 0) {
            generatedId = 1;
        } else {
            generatedId = this.idList[this.idList.length - 1] + 1;
        }
        this.idList.push(generatedId);
        return generatedId;
    }

    getAllAssets() {
        return this.idList;
    }
}