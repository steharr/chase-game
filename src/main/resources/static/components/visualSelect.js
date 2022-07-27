const possibleFilledOptions = 5;
const filledOptionClass = 'option-enemy';
const unfilledOptionClass = 'option-empty';

document.addEventListener("DOMContentLoaded", setupVisualSelect);

function setupVisualSelect() {

    const startingOptionEnemies = Math.ceil(possibleFilledOptions / 2);
    for (let i = 0; i < possibleFilledOptions; i++) {
        if (i <= startingOptionEnemies) {
            addOption(filledOptionClass);
        } else {
            addOption(unfilledOptionClass);
        }
    }

}

function moveVisualSelect(direction) {

    const currentEnemiesCount = document.getElementsByClassName(filledOptionClass).length;
    let newEnemiesCount;

    clearOptions();

    if (direction === 'left') {
        newEnemiesCount = currentEnemiesCount - 1 > 0 ? currentEnemiesCount - 1 : 0;
    }

    if (direction === 'right') {
        newEnemiesCount = currentEnemiesCount + 1 < possibleFilledOptions ? currentEnemiesCount + 1 : possibleFilledOptions;
    }

    for (let i = 0; i < possibleFilledOptions; i++) {
        if (i < newEnemiesCount) {
            addOption(filledOptionClass);
        } else {
            addOption(unfilledOptionClass);
        }
    }
}

function clearOptions() {
    const optionContainer = document.getElementById('visual-select-options');
    while (optionContainer.firstChild) {
        optionContainer.firstChild.remove();
    }
}

function addOption(optionClassType) {
    const optionContainer = document.getElementById('visual-select-options');
    const option = document.createElement('div')
    option.classList.add('option');
    option.classList.add(optionClassType);
    optionContainer.appendChild(option);
}