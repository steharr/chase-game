function postGameSetup() {

    const postUrl = window.location.href.match(/^.*\//) + "setup";
    const chosenDifficulty = document.getElementsByClassName('option-difficulty').length;
    const chosenEnemies = document.getElementsByClassName('option-enemy').length;
    const chosenMode = 'chase';
    const select = document.getElementById("obstacles");
    const chosenObstacles = select.options[select.selectedIndex].value;

    let data = {
        id: 1,
        mode: chosenMode,
        difficulty: chosenDifficulty,
        enemies: chosenEnemies,
        obstacles: chosenObstacles,
    };

    fetch(postUrl, {
        method: "POST",
        headers: getHttpHeaders(),
        body: JSON.stringify(data)
    }).then(res => console.log(res)).catch(err => console.log(err));

};

function getHttpHeaders() {
    let token = $("meta[name='_csrf']").attr("content");
    let header = $("meta[name='_csrf_header']").attr("content");
    return {
        [header]: token,
        "charset": "UTF-8",
        "Content-Type": "application/json"
    }
}