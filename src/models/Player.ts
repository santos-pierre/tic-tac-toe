import PlayerShape from '../enum/PlayerShape';

class Player {
    private name: string;
    private form: PlayerShape;

    constructor(name: string, form: PlayerShape) {
        this.name = name;
        this.form = form;
    }

    getName() {
        return this.name;
    }

    getForm() {
        return this.form;
    }
}

export default Player;
