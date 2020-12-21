import PlayerShape from '../enum/PlayerShape';
import BoardGame from './BoardGame';
import Cell from './Cell';
import Player from './Player';
import Coordinates from './Coordinates';
import GameStatus from '../enum/GameStatus';

/**
 * Provides informations and methods for the coordinates in the game board.
 */

class Game {
    private players: Array<Player>;
    private boardGame: BoardGame;
    private remainingCells: number;
    private currentPlayer: Player;
    private winner: Player | undefined;
    private gameStatus: GameStatus = GameStatus.PENDING;

    /**
     * Constructs the game
     *
     * @param boardSize the size of the gameboard (default 3x3)
     * @param players an array of players, each one having name and shapes
     */
    constructor(
        boardSize: number = 3,
        players: Array<Player> = [
            new Player('Player 1', PlayerShape.Cross),
            new Player('Player 2', PlayerShape.Circle),
        ]
    ) {
        this.players = players;
        this.boardGame = new BoardGame(boardSize);
        this.remainingCells = boardSize * boardSize;
        this.currentPlayer = players[0];
    }

    /**
     * Get the value of the players in the game
     *
     * @returns the players in the game
     */

    getPlayers(): Array<Player> {
        return this.players;
    }

    /**
     * Get the value of the current boardgame
     *
     * @returns the boardgame composed with cells
     */
    getBoardGame(): BoardGame {
        return this.boardGame;
    }

    /**
     * Get the value of the current player
     *
     * @returns the current player
     */
    getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    /**
     * Get the value of the game status
     *
     * @returns the game status
     */
    getGameStatus(): GameStatus {
        return this.gameStatus;
    }

    /**
     * Get the value of remaining cells in te boardgame
     *
     * @returns remaining cells in te boardgame
     */
    getRemainingCells(): number {
        return this.remainingCells;
    }

    /**
     * Get the value of the winner
     *
     * @returns return a player if there is a winner else return undefined if it is a draw
     */
    getWinner(): Player | undefined {
        return this.winner;
    }

    /**
     * Modify the current player by the given one
     *
     * @typeparam Player the player defined by a name and a shape
     *
     * @param newPlayer the player that we want to be the current one
     */

    setCurrentPlayer(newPlayer: Player) {
        this.currentPlayer = newPlayer;
    }

    /**
     * Modify the game status of the game by the given one
     *
     * @typeparam GameStatus the different status of the game
     *
     * @param newGameStatus the game status that we want to be the current one
     */

    setGameStatus(newGameStatus: GameStatus) {
        this.gameStatus = newGameStatus;
    }

    /**
     * Modify the count of the remaining cells of the game by the given count
     *
     * @typeparam GameStatus the different status of the game
     *
     * @param newRemainingCells the count of the remaining cells that we want to be the current count
     */

    setRemainingCells(newRemainingCells: number) {
        this.remainingCells = newRemainingCells;
    }

    /**
     * Modify the winner by the given one
     *
     * @typeparam Player the player defined by a name and a shape
     *
     * @param winner the player that we want to be the winner
     */

    setWinner(winner: Player) {
        this.winner = winner;
    }

    /**
     * The player select a cell for a given position in the game board and fill it with his form
     *
     * @param position the position selected by the current player
     */

    playerAction(position: Coordinates) {
        if (this.gameStatus === GameStatus.PENDING) {
            this.boardGame.setCell(
                position,
                this.currentPlayer.getForm(),
                true
            );
            this.setRemainingCells(this.getRemainingCells() - 1);
            if (!this.isOver(position)) {
                // Remove the last player from the list of players
                let lastPlayer = this.players.shift();
                // The first one in the list is the current player
                this.currentPlayer = this.players[0];
                // We put back the last player in the list
                if (lastPlayer) {
                    this.players.push(lastPlayer);
                }
            }
        }
    }

    /**
     * Tell us if the game is over
     *
     * @param position the position selected by the current player
     */

    isOver(position: Coordinates) {
        let isOver: boolean = false;
        let boardSize: number = this.boardGame.getSize();
        // Check Row
        if (this.checkRow(position, boardSize, this.currentPlayer)) {
            isOver = true;
            this.setWinner(this.currentPlayer);
            this.setGameStatus(GameStatus.END);
            return isOver;
        }
        // Check Col
        if (this.checkCol(position, boardSize, this.currentPlayer)) {
            isOver = true;
            this.setWinner(this.currentPlayer);
            this.setGameStatus(GameStatus.END);
            return isOver;
        }
        // Check Diagonal
        if (this.checkDiagonal(position, boardSize, this.currentPlayer)) {
            isOver = true;
            this.setWinner(this.currentPlayer);
            this.setGameStatus(GameStatus.END);
            return isOver;
        }

        // Check if there are cells available to play
        if (this.getRemainingCells() === 0) {
            isOver = true;
            this.setGameStatus(GameStatus.END);
            return isOver;
        }

        return isOver;
    }

    /**
     * Tell us if at the position selected the player have selected all the cell from the row
     *
     * @param position the position selected by the player
     * @param boardSize the size of the board
     * @param player the player that selected the cell
     */

    checkRow(position: Coordinates, boardSize: number, player: Player) {
        let isOver = false;
        // Check Row
        let row = this.getCellsInRowSelectedByPlayer(position, player);
        // Check only if all cell in a row are selected
        if (row.length === boardSize) {
            isOver =
                row.filter(
                    (cell: Cell) => cell.getContent() === player.getForm()
                ).length === boardSize;
            if (isOver) {
                return isOver;
            }
        }
        return isOver;
    }

    /**
     * Tell us if at the position selected the player have selected all the cell from the column
     *
     * @param position the position selected by the player
     * @param boardSize the size of the board
     * @param player the player that selected the cell
     */

    checkCol(position: Coordinates, boardSize: number, player: Player) {
        let isOver = false;
        // Check col
        let col = this.getCellsInColSelectedByPLayer(position, player);
        // Check only if all cell in a col are selected
        if (col.length === boardSize) {
            isOver =
                col.filter(
                    (cell: Cell) => cell.getContent() === player.getForm()
                ).length === boardSize;
            if (isOver) {
                return isOver;
            }
        }
        return isOver;
    }

    /**
     * Tell us if at the position selected the player have selected all the cell from the diagonals
     *
     * @param position the position selected by the player
     * @param boardSize the size of the board
     * @param player the player that selected the cell
     */

    checkDiagonal(position: Coordinates, boardSize: number, player: Player) {
        let isOver = false;
        let diagonalPositive = this.getCellsInDiagonalSelectedByPLayer(
            position,
            player
        )[0];
        let diagonalNegative = this.getCellsInDiagonalSelectedByPLayer(
            position,
            player
        )[1];
        // Check positive diagonal
        if (diagonalPositive.length === boardSize) {
            isOver =
                diagonalPositive.filter(
                    (cell: Cell) => cell.getContent() === player.getForm()
                ).length === boardSize;
            if (isOver) {
                return isOver;
            }
        }
        // Check negative diagonal
        if (diagonalNegative.length === boardSize) {
            isOver =
                diagonalNegative.filter(
                    (cell: Cell) => cell.getContent() === player.getForm()
                ).length === boardSize;
            if (isOver) {
                return isOver;
            }
        }
        return isOver;
    }

    /**
     *  Give an array containing the cells for a row of given player for a given coordinate
     * @param coordinates the coordinate that the player selected
     * @param player the player that select the cell
     *
     * @returns Returns an array containing the cells in the same row selected by a given player
     */
    getCellsInRowSelectedByPlayer(
        coordinates: Coordinates,
        player: Player
    ): Array<Cell> {
        return this.getBoardGame()
            .getRow(coordinates)
            .filter((element) => {
                return element.getContent() === player.getForm();
            });
    }

    /**
     *  Give an array containing the cells for a column of given player for a given coordinate
     * @param coordinates the coordinate that the player selected
     * @param player the player that select the cell
     *
     * @returns Returns an array containing the cells in the same column selected by a given player
     */

    getCellsInColSelectedByPLayer(
        coordinates: Coordinates,
        player: Player
    ): Array<Cell> {
        return this.getBoardGame()
            .getCol(coordinates)
            .filter((element) => {
                return element.getContent() === player.getForm();
            });
    }

    /**
     *  Give an array containing the cells for a diagonals of given player for a given coordinate
     * @param coordinates the coordinate that the player selected
     * @param player the player that select the cell
     *
     * @returns Returns an array containing the cells in the same diagonals selected by a given player
     */

    getCellsInDiagonalSelectedByPLayer(
        coordinates: Coordinates,
        player: Player
    ): Array<Array<Cell>> {
        let positiveNegativeDiagonalArray = this.getBoardGame().getDiagonal(
            coordinates
        );

        let positiveDiagonal = positiveNegativeDiagonalArray[0];
        let negativeDiagonal = positiveNegativeDiagonalArray[1];

        return [
            positiveDiagonal.filter((element) => {
                return element.getContent() === player.getForm();
            }),
            negativeDiagonal.filter((element) => {
                return element.getContent() === player.getForm();
            }),
        ];
    }
}

export default Game;
