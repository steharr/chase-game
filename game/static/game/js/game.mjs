import {Asset, UserCharacter, AiCharacter} from './Asset.js';

let mouse = new UserCharacter('mouse','blue');
let cat = new AiCharacter('cat', 'red', 'mouse','hard');
let cheese = new Asset('cheese','yellow');

$( document ).ready(function() {
    generateObstacles();
    mouse.spawn([5,5]);
    cat.spawn([8,8]);
    cheese.spawn([10,10]);
});

$(document).on('keydown', function(e){
    let key = e.code;
    switch (key){
        // up
        case "ArrowUp":
            mouse.move('up');
            cat.chase();
            break;
        // down
        case "ArrowDown":
            mouse.move('down');
            cat.chase();
            break;
        // left
        case "ArrowLeft":
            mouse.move('left');
            cat.chase();
            break;
        // right
        case "ArrowRight":
            mouse.move('right');
            cat.chase();
            break;
        // space
        case "Space":
            mouse.route.display();
            break;
    }
});

function generateObstacles(){
    let cell;
    for (let i = 0; i < 10; i++){
        for (let j = 0; j < 3; j ++){
            let jj = Math.floor(Math.random()*10);
            cell = $(`div[data-x="${jj}"][data-y="${i}"]`)
            cell.addClass('obstacle');
        }
    }
}