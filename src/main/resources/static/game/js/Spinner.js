
export class Spinner {
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