import PlayerShape from '../enum/PlayerShape';
import Game from '../models/Game';
import { walkDOM } from '../utils/utils';

class View {
    constructor() {}

    // Create an element with an optional CSS class
    createElement(tag: string, className: Array<string>) {
        const element = document.createElement(tag);
        if (className) element.classList.add(...className);

        return element;
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
        let classList = [
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
                        childDiv.innerHTML = content;
                    }
                }
            }
        });
    }
}

export default View;
