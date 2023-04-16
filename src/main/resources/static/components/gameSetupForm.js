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

    const spinner = new Spinner("postSetup");
    spinner.startSpinner();
    setTimeout(()=>{
        fetch(postUrl, {
            method: "POST",
            headers: getHttpHeaders(),
            body: JSON.stringify(data)
        }).then(res => {
            spinner.stopSpinner("Saved")
        }).catch(err => console.log(err));
    }, 500);

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

 class Spinner {
    constructor(elementId){
        this.id = elementId;
        this.spinnerDisplayed = false;
        this.element = document.getElementById(this.id);
        this.SPINNER_HTML = `
        <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        `
    }

    startSpinner(){
        this.element.innerHTML = this.SPINNER_HTML;
        this.spinnerDisplayed = true;
    }

    stopSpinner(message="", disableBtn=false){
        this.element.innerHTML = message;
        this.spinnerDisplayed = false;
        if (disableBtn){
            this.element.disabled = true;
        }
    }

    toggleSpinner(){
        this.spinnerDisplayed ? this.stopSpinner(): this.startSpinner();
        this.spinnerDisplayed = !this.spinnerDisplayed;
    }


}