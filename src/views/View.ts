import GameStatus from '../enum/GameStatus';
import PlayerShape from '../enum/PlayerShape';
import Game from '../models/Game';
import { walkDOM } from '../utils/utils';

class View {
    private playerSelectedStyle;
    private playerNotSelectedStyle;
    constructor() {
        this.playerSelectedStyle = 'rounded-lg shadow-xl shadow w-36 border-b-8 border-indigo-800 dark:bg-gray-700'.split(
            ' '
        );
        this.playerNotSelectedStyle = 'rounded-lg w-36 border-b-8 border-transparent'.split(
            ' '
        );
    }

    // Create an element with an optional CSS class
    createElement(tag: string, className: Array<string>, id: string = '') {
        const element = document.createElement(tag);
        if (className) element.classList.add(...className);
        if (id) element.id = id;
        return element;
    }

    getPlayerNotSelectedStyle() {
        return this.playerNotSelectedStyle;
    }

    getPlayerSelectedStyle() {
        return this.playerSelectedStyle;
    }

    // Retrieve an element from the DOM
    getElement(selector: string) {
        const element = document.querySelector(selector);

        return element;
    }
    // Start of the game
    init(game: Game, callback: Function) {
        let boardGame: Array<HTMLElement> = [];
        let root = this.getElement('#root');
        let classList = [];
        switch (game.getBoardGame().getSize()) {
            case 3:
                classList = ['grid', `grid-cols-3`, `gap-3`];
                break;
            case 4:
                classList = ['grid', `grid-cols-4`, `gap-4`];
                break;
            case 5:
                classList = ['grid', `grid-cols-5`, `gap-5`];
                break;
            default:
                classList = ['grid', `grid-cols-3`, `gap-3`];
                break;
        }
        classList = [
            'grid',
            `grid-cols-${game.getBoardGame().getSize()}`,
            `gap-${game.getBoardGame().getSize()}`,
        ];
        root?.classList.add(...classList);

        game.getBoardGame()
            .getBoard()
            .map((row) => {
                row.map((cell) => {
                    let wrapper = this.createElement('div', [
                        'bg-gray-100',
                        'dark:bg-gray-700',
                        'rounded-lg',
                        'shadow-xl',
                        'w-36',
                    ]);
                    wrapper.dataset.coordinates = `({"row" : ${cell.getRow()}, "col": ${cell.getCol()}})`;
                    let element = this.createElement('div', [
                        'h-32',
                        'text-9xl',
                        'font-bold',
                        'flex',
                        'justify-center',
                    ]);
                    wrapper.addEventListener('click', function (event) {
                        let data = this.getAttribute('data-coordinates');
                        if (data) {
                            let coordinate = eval(data);
                            callback(coordinate.row, coordinate.col);
                        }
                    });
                    wrapper.append(element);
                    boardGame.push(wrapper);
                });
            });
        boardGame.forEach((element) => {
            root?.appendChild(element);
        });

        // Current Players

        let players = this.getElement('#players');

        let player1 = this.createElement(
            'div',
            this.getPlayerSelectedStyle(),
            game.getPlayers()[0].getName()
        );

        // Cross
        player1.innerHTML = `<div class="h-32 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-32 h-32" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>`;

        let player2 = this.createElement(
            'div',
            this.getPlayerNotSelectedStyle(),
            game.getPlayers()[1].getName()
        );
        // Circle
        player2.innerHTML = `<div class="h-32 font-bold flex justify-center items-center">
            <svg class="w-24 h-24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 1 0 19.2-.001C19.6 4.698 15.301.4 10 .4zm0 17.199A7.6 7.6 0 1 1 10 2.4a7.6 7.6 0 1 1 0 15.199z"/>
            </svg>
        </div>`;

        players?.appendChild(player1);
        players?.appendChild(player2);
    }

    refreshDOM(row: number, col: number, content: PlayerShape) {
        let root = document.querySelector('#root');
        walkDOM(root, (el: Element) => {
            let coordinateAttribute = el.getAttribute('data-coordinates');
            if (coordinateAttribute) {
                let coordinate = eval(coordinateAttribute);
                if (coordinate.row === row && coordinate.col === col) {
                    let childDiv = el.firstElementChild;
                    if (childDiv) {
                        if (content === PlayerShape.Cross) {
                            childDiv.innerHTML = `<div class="h-32 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-32 h-32" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            </div>`;
                        } else if (content === PlayerShape.Circle) {
                            childDiv.innerHTML = `<div class="h-32 font-bold flex justify-center items-center">
                                <svg class="w-24 h-24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 1 0 19.2-.001C19.6 4.698 15.301.4 10 .4zm0 17.199A7.6 7.6 0 1 1 10 2.4a7.6 7.6 0 1 1 0 15.199z"/>
                                </svg>
                            </div>`;
                        }
                    }
                }
            }
        });
    }

    refreshPlayers(game: Game) {
        let root = document.querySelector('#players');
        if (game.getGameStatus() === GameStatus.END && !game.getWinner()) {
            //If ther is a draw remove Style from player 1 and player 2
            let player1 = document.getElementById(
                `${game.getPlayers()[0].getName()}`
            );
            let player2 = document.getElementById(
                `${game.getPlayers()[1].getName()}`
            );
            if (player1 && player2) {
                player1.classList.value = '';
                player1.classList.add(...this.getPlayerNotSelectedStyle());
                player2.classList.value = '';
                player2.classList.add(...this.getPlayerNotSelectedStyle());
            }
        } else {
            walkDOM(root, (el: Element) => {
                if (el.id === game.getPlayers()[0].getName()) {
                    el.classList.value = '';
                    el.classList.add(...this.getPlayerSelectedStyle());
                } else if (el.id === game.getPlayers()[1].getName()) {
                    el.classList.value = '';
                    el.classList.add(...this.getPlayerNotSelectedStyle());
                }
            });
        }
    }
}

export default View;
