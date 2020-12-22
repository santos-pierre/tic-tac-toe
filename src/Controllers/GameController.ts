import GameStatus from '../enum/GameStatus';
import Coordinates from '../models/Coordinates';
import Game from '../models/Game';
import View from '../views/View';

class GameController {
    private game: Game;
    private view: View;

    constructor(size: number = 3) {
        this.game = new Game(size);
        this.view = new View();
    }

    init() {
        this.view.init(this.game, this.handlePlayer.bind(this));
    }

    getGame() {
        return this.game;
    }

    getView() {
        return this.view;
    }

    handlePlayer(row: number, col: number) {
        if (this.game.getGameStatus() === GameStatus.PENDING) {
            let selectedCell = this.game
                .getBoardGame()
                .getCell(new Coordinates(row, col));
            this.view.refreshDOM(
                row,
                col,
                this.game.getCurrentPlayer().getForm()
            );

            this.game.playerAction(
                new Coordinates(selectedCell.getRow(), selectedCell.getCol())
            );
            this.view.refreshPlayers(this.getGame());
        }
    }
}

export default GameController;
