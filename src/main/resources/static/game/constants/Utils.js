export class Utils {


    static PIXIJS_RESOURCES_PATH = '';

    static generateRandomCellReference() {
        const randomRow = Math.floor(Math.random() * ROWS);
        const randomCol = Math.floor(Math.random() * COLS);
        return {
            x: randomRow,
            y: randomCol
        };
    }


    static generateRandomNumber(min, max) {
        let random = Math.round((Math.random()) * max);

        if (random < min) {
            while (random < min) {
                random = Math.round((Math.random()) * max);
            }
        }

        return random;
    }
}