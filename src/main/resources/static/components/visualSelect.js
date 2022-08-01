// const possibleFilledOptionsList[containerNumber] = GAME_SETUP.possibleEnemies;
const visualSelectClassesList = ['option-enemy', 'option-difficulty'];
const possibleFilledOptionsList = [GAME_TYPE.possibleEnemies, 3];
const unfilledOptionClass = 'option-empty';


document.addEventListener("DOMContentLoaded", () => {
    let i = 0;
    visualSelectClassesList.forEach((visualSelect) => {
        setupVisualSelect(i, visualSelect);
        i++;
    })
});

function setupVisualSelect(containerNumber, optionClass) {

    const startingOptions = Math.ceil(possibleFilledOptionsList[containerNumber] / 2);
    for (let i = 0; i < possibleFilledOptionsList[containerNumber]; i++) {
        if (i <= startingOptions) {
            addOption(containerNumber, optionClass);
        } else {
            addOption(containerNumber, unfilledOptionClass);
        }
    }

}

function moveVisualSelect(containerNumber, optionClass, direction) {

    const optionCountOld = document.getElementsByClassName(optionClass).length;
    let optionCountNew;

    clearOptions(containerNumber);

    if (direction === 'left') {
        optionCountNew = optionCountOld - 1 > 0 ? optionCountOld - 1 : 0;
    }

    if (direction === 'right') {
        optionCountNew = optionCountOld + 1 < possibleFilledOptionsList[containerNumber] ? optionCountOld + 1 : possibleFilledOptionsList[containerNumber];
    }

    for (let i = 0; i < possibleFilledOptionsList[containerNumber]; i++) {
        if (i < optionCountNew) {
            addOption(containerNumber, optionClass);
        } else {
            addOption(containerNumber, unfilledOptionClass);
        }
    }
}

function clearOptions(containerNumber) {
    const optionContainer = document.getElementById(`visual-select-options-${containerNumber}`);
    while (optionContainer.firstChild) {
        optionContainer.firstChild.remove();
    }
}

function addOption(containerNumber, optionClass) {
    const optionContainer = document.getElementById(`visual-select-options-${containerNumber}`);
    const option = document.createElement('div')
    option.classList.add('option');
    option.classList.add(optionClass);
    optionContainer.appendChild(option);
}