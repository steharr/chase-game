export class GameSetupConstants {
    static obstacles = {
        'little': 20,
        'many': 40,
        'lots': 80
    }

    static difficulties = {
        1: 'easy',
        2: 'medium',
        3: 'hard'
    }


    static topRightCord = {
        x: COLS - 1,
        y: ROWS
    }

    static botRightCord = {
        x: COLS - 1,
        y: 1
    }

    static topLeftCord = {
        x: 0,
        y: ROWS - 1
    }

    static botLeftCord = {
        x: 0,
        y: 1
    }

    static endGameMessages = {
        victory: {
            title: "You Won!!",
            body: "Well done you won!! How about you try again...."
        },
        defeat: {
            title: "You Lost!!",
            body: "Unlucky!! How about you try again...."
        }
    }

}