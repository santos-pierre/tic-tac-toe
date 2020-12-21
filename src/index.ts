import GameController from './Controllers/GameController';

let buttonPlay = document.querySelector('#playButton');

if (buttonPlay) {
    buttonPlay.addEventListener('click', function (event) {
        let size = buttonPlay?.getAttribute('data-value');
        if (size) {
            new GameController(eval(size)).init();
        }
    });
}
// const app = new GameController(4);

// app.init();
