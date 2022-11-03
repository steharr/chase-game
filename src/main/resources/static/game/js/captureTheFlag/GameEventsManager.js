export class GameEventsManager {

    constructor() {
        this.events = [];
        this.target = document.querySelector('#eventElement');
    }

    addEvent(gameEvent) {
        if (!this.events.includes(gameEvent)) {
            this.events.push(new CustomEvent(gameEvent, {
                detail: gameEvent.detail
            }));
        }
    }

    publishEvent(gameEvent) {
        const eventToDispatch = this.events.find(e => {
            if (e.detail == gameEvent.detail) {
                return e;
            }
        });
        this.target.dispatchEvent(eventToDispatch);
    }

}