import PlayerShape from '../enum/PlayerShape';
import Cell from './Cell';
import Coordinates from './Coordinates';

/**
 * Provides all informations of the gameboard in the game.
 */

class BoardGame {
    private size: number;
    private board: Array<Array<Cell>>;

    /**
     * Constructs the boardgame
     *
     * @param size the size of the gameboard (default 3x3)
     */

    constructor(size: number = 3) {
        this.size = size;
        this.board = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(new Cell(i, j));
            }
            this.board.push(row);
        }
    }

    /**
     * Get the value of the current boardgame
     *
     * @returns the boardgame composed with cells
     */

    getBoard(): Array<Array<Cell>> {
        return this.board;
    }

    /**
     * Get the value of the size of the boardgame
     *
     * @returns the size of the boardgame
     */

    getSize(): number {
        return this.size;
    }

    /**
     * Get the value of a cell in the boardgame defined for given coordinate
     *
     * @param coordinate the coordinate defined for the cell you want
     *
     * @returns the cell defined for the given coordinate
     */

    getCell(coordinate: Coordinates): Cell {
        return this.board[coordinate.getRow()][coordinate.getCol()];
    }

    /**
     * Returns an array that contains the cells in the boardgame for a defined coordinate
     *
     * @param coordinate the coordinate that you want to know all the corresponding cell of the gameboard
     *
     * @returns an array corresponding to the cells in the boardgame for the given coordinate
     */

    getRow(coordinate: Coordinates): Array<Cell> {
        return this.board[coordinate.getRow()];
    }

    /**
     * Returns an array that contains the cells in the boardgame for a defined coordinate
     *
     * @param coordinate the coordinate that you want to know all the corresponding cell of the gameboard
     *
     * @returns an array corresponding to the cells in the boardgame for a defined coordinate
     */

    getCol(coordinate: Coordinates): Array<Cell> {
        let column: Array<Cell> = [];
        this.board.map((boardRow) => {
            boardRow.map((boardCell: Cell) => {
                if (boardCell.getCol() === coordinate.getCol()) {
                    column.push(boardCell);
                    return;
                }
            });
        });
        return column;
    }

    /**
     * Returns 2 array that contains the cells for a positive and negative diagonal (in this order) for a defined coordinate
     * Array[0] => positive diagonal
     * Array[1] => negative diagonal
     * @typeparam Coordinate the position of the cell in the gameboard
     *
     * @param coordinate the coordinate that you want to know all the corresponding cell of the gameboard
     *
     * @returns an array corresponding to the cell of the given column
     */

    getDiagonal(coordinate: Coordinates): Array<Array<Cell>> {
        let positiveDiagonal: Array<Cell> = [this.getCell(coordinate)];
        let negativeDiagonal: Array<Cell> = [this.getCell(coordinate)];
        this.board.map((boardRow) => {
            boardRow.map((boardCell: Cell) => {
                // calcul the slope between the given coordinate and the current one to see
                let slope: number =
                    (boardCell.getCol() - coordinate.getCol()) /
                    (boardCell.getRow() - coordinate.getRow());
                // Slope === 1 the current cell is in the positive diagonal of the given coordinate
                if (slope === 1) {
                    positiveDiagonal.push(boardCell);
                    return;
                } // Slope === -1 the current cell is in the negative diagonal of the given coordinate
                else if (slope === -1) {
                    negativeDiagonal.push(boardCell);
                    return;
                }
            });
        });
        return [
            positiveDiagonal.sort((a, b) => a.getRow() - b.getRow()),
            negativeDiagonal.sort((a, b) => a.getRow() - b.getRow()),
        ];
    }

    /**
     * Set the content and isSelected of a cell in the boardgame for a given coordinate
     *
     * @typeparam PlayerShape the different form that define the player
     * @typeparam Coordinate the position of the cell in the gameboard
     *
     * @param coordinate the coordinate that you want to modify in the boardgame
     * @param content the new content of the cell
     * @param status the new status of the cell
     *
     */

    setCell(coordinate: Coordinates, content: PlayerShape, status: boolean) {
        this.getCell(coordinate).setCell(content, status);
    }
}

export default BoardGame;
