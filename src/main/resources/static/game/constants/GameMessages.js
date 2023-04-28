// function credit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#description
function template(strings, ...keys) {
    return (function (...values) {
        const dict = values[values.length - 1] || {};
        const result = [strings[0]];
        keys.forEach((key, i) => {
            const value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
}

export class GameMessages {
    static enemyClose = "Enemy is close!! Watch out ...";
    static gameWin = template`You Won!!! Well done ... your score was ${0}!`;
    static gameLose = template`You Lost!!! Better luck next time ... your score was ${0}!`;
    static gameWinModal = template`Well done you won!! ... your score was ${0}!`
    static gameWinModalSavePrompt = `Select your username to save score below:`
}