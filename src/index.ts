import GameController from './Controllers/GameController';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let size = urlParams.get('size');

if (size) {
    new GameController(eval(size)).init();
}
