import GameController from './Controllers/GameController';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let size = Number(urlParams.get('size'));

if (size > 2 && size < 6) {
    new GameController(size).init();
} else {
    location.href = location.href.replace(`?size=${size}`, `?size=${3}`);
    new GameController().init();
}
